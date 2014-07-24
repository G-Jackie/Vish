# Copyright 2011-2012 Universidad Politécnica de Madrid and Agora Systems S.A.
#
# This file is part of ViSH (Virtual Science Hub).
#
# ViSH is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# ViSH is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with ViSH.  If not, see <http://www.gnu.org/licenses/>.

# ViSH Recommender System

class RecommenderSystem

  def self.excursion_suggestions(user=nil,excursion=nil,options={})
    # Step 0: Initialize all variables (N,NMax,random,...)
    options = prepareOptions(options)

    #Step 1: Preselection
    preSelectionLOs = getPreselection(user,excursion,options)

    #Step 2: Scoring
    rankedLOs = orderByScore(preSelectionLOs,user,excursion,options)

    #Step 3
    return rankedLOs.first(options[:n])
  end

  # Step 0: Initialize all variables (N,NMax,random,...)
  def self.prepareOptions(options={})
    #Performance test
    if options[:test]==true
      return options
    else
      options[:test] = false
    end

    unless options[:n].is_a? Integer
      options[:n] = 20
    end

    unless options[:random] == false
      options[:random] = true
    end

    #NMax
    if options[:n]<10
      options[:nMax] = 30
    else
      options[:nMax] = 3*options[:n]
    end

    options
  end

  #Step 1: Preselection
  def self.getPreselection(user,excursion,options={})
    preSelection = []

    #Search excursions using the search engine
    keywords = compose_keywords(user,excursion,options)
    if !keywords.empty?
      searchTerms = keywords.join(" ")
      searchEngineExcursions = (Excursion.search searchTerms, search_options(user,excursion,options)).reject{|e| e.nil?} rescue []
      preSelection.concat(searchEngineExcursions)
    end

    #Add other excursions of the same author
    if !excursion.nil? and !options[:test]
      userIdToReject = (!user.nil?) ? user.id : -1
      unless userIdToReject == excursion.author.id
        authoredExcursions = Excursion.authored_by(excursion.author).reject{|e| e.draft == true or e.author_id == userIdToReject or e.id == excursion.id}
        preSelection.concat(authoredExcursions)
        preSelection.uniq!
      end
    end

    pSL = preSelection.length

    if options[:random]
      #Random: fill to Nmax, and select 2/3Nmax randomly
      if pSL < options[:nMax]
        preSelection.concat(getExcursionsToFill(options[:nMax]-pSL,preSelection,user,excursion,options))
      end
      sampleSize = (options[:nMax]*2/3.to_f).ceil
      preSelection = preSelection.sample(sampleSize)
    else
      if pSL < options[:n]
        preSelection.concat(getExcursionsToFill(options[:n]-pSL,preSelection,user,excursion,options))
      end
      preSelection = preSelection.first(options[:nMax])
    end

    return preSelection
  end

  #Step 2: Scoring
  def self.orderByScore(preSelectionLOs,user,excursion,options)

    if preSelectionLOs.blank?
      return preSelectionLOs
    end

    #Get some vars to normalize scores
    maxPopularity = preSelectionLOs.max_by {|e| e.popularity }.popularity
    maxQuality = preSelectionLOs.max_by {|lo| lo.qscore }.qscore

    calculateCSScore = !excursion.nil?
    calculateUSScore = !user.nil?
    calculatePopularityScore = !(maxPopularity.nil? or maxPopularity == 0)
    calculateQualityScore = !(maxQuality.nil? or maxQuality == 0)

    weights = {}

    if calculateCSScore
      #Recommend items similar to other item
      weights[:cs_score] = 0.70
      weights[:us_score] = 0.10
      weights[:popularity_score] = 0.10
      weights[:quality_score] = 0.10
    elsif calculateUSScore
      #Recommend items for a user
      weights[:cs_score] = 0.0
      weights[:us_score] = 0.50
      weights[:popularity_score] = 0.25
      weights[:quality_score] = 0.25
    else
      #Recommend items for anonymous users
      weights[:cs_score] = 0.0
      weights[:us_score] = 0.0
      weights[:popularity_score] = 0.5
      weights[:quality_score] = 0.5
    end

    preSelectionLOs.map{ |e|
      if calculateCSScore
        cs_score = RecommenderSystem.contentSimilarityScore(excursion,e)
      else
        cs_score = 0
      end

      if calculateUSScore
        us_score = RecommenderSystem.userProfileSimilarityScore(user,e)
      else
        us_score = 0
      end

      if calculatePopularityScore
        popularity_score = RecommenderSystem.popularityScore(e,maxPopularity)
      else
        popularity_score = 0
      end

      if calculateQualityScore
        quality_score = RecommenderSystem.qualityScore(e,maxQuality)
      else
        quality_score = 0
      end

      e.score = weights[:cs_score] * cs_score + weights[:us_score] * us_score + weights[:popularity_score] * popularity_score + weights[:quality_score] * quality_score
      
      unless options[:test]
        e.score_tracking = {
          :cs_score => cs_score,
          :us_score => us_score,
          :popularity_score => popularity_score,
          :quality_score => quality_score,
          :weights => weights,
          :overall_score => e.score,
          :rec => "ViSHRecommenderSystem"
        }.to_json
      end
    }

    preSelectionLOs.sort! { |a,b|  b.score <=> a.score }
  end

  #Content Similarity Score (between 0 and 1)
  def self.contentSimilarityScore(loA,loB)
    weights = {}
    weights[:language] = 0.5
    weights[:keywords] = 0.3
    weights[:title] = 0.2
    # nMetadataFields = weights.length

    unless ["independent","ot"].include? loA.language
      languageD = RecommenderSystem.getSemanticDistance(loA.language,loB.language)
    else
      languageD = 0
    end

    keywordsD = RecommenderSystem.getKeywordsDistance(loA.tag_list.to_a.delete_if{|e| e=="ViSHCompetition2013"},loB.tag_list.to_a)
    titleD = RecommenderSystem.getKeywordsDistance(loA.title.split(" ").reject{|w| w.length<3},loB.title.split(" ").reject{|w| w.length<3})
    
    return weights[:language] * languageD + weights[:keywords] * keywordsD + weights[:title] * titleD
  end

  #User profile Similarity Score (between 0 and 1)
  def self.userProfileSimilarityScore(user,lo)
    weights = {}
    weights[:language] = 0.6
    weights[:keywords] = 0.4

    unless ["independent","ot"].include? lo.language
      languageD = RecommenderSystem.getSemanticDistance(user.language,lo.language)
    else
      languageD = 0
    end
    keywordsD = RecommenderSystem.getKeywordsDistance(user.tag_list.to_a,lo.tag_list.to_a)

    return weights[:language] * languageD + weights[:keywords] * keywordsD
  end

  #Popularity Score (between 0 and 1)
  #See scheduled:recalculatePopularity task in lib/tasks/scheduled.rake to adjust popularity weights
  def self.popularityScore(lo,maxPopularity)
    return lo.popularity/maxPopularity.to_f
  end

  #Quality Score (between 0 and 1)
  #See app/decorators/social_stream/base/activity_object_decorator.rb, method calculate_qscore to adjust weights
  def self.qualityScore(lo,maxQualityScore)
    return lo.qscore/maxQualityScore.to_f
  end


  #######################
  ## Recommended Search
  #######################

  # Usage example: RecommenderSystem.search({:keywords=>"biology", :n=>10})
  def self.search(options={})

    #Specify searchTerms
    if (![String,Array].include? options[:keywords].class) or (options[:keywords].is_a? String and options[:keywords].strip=="")
      browse = true
      searchTerms = ""
    else
      browse = false
      if options[:keywords].is_a? String
        searchTerms = options[:keywords].gsub(/[,+|&]/,' ').split(" ")
      end
      #Remove keywords with less than 3 characters
      searchTerms.reject!{|s| s.length < 3}
      searchTerms = searchTerms.join(" ")
    end

    #Specify search options
    opts = {}

    if options[:n].is_a? Integer
      n = options[:n]
    else
      if !options[:page].nil?
        n = 16    #default results when pagination is requested
      else
        n = 10000 #default (All results found)
      end
    end

    #Logical conector: OR
    opts[:match_mode] = :any
    opts[:rank_mode] = :wordcount
    opts[:per_page] = n
    opts[:field_weights] = {
       :title => 50,
       :tags => 40,
       :description => 1,
       :name => 60 #(For users)
    }

    if !options[:page].nil?
      opts[:page] = options[:page].to_i
    end

    if options[:order].is_a? String
      opts[:order] = options[:order]
    end

    if options[:models].is_a? Array
      opts[:classes] = options[:models]
    else
      opts[:classes] = SocialStream::Search.models(:extended)
    end

    opts[:with] = {}
    #Only 'Public' objects, drafts are not searched.
    opts[:with][:relation_ids] = Relation.ids_shared_with(nil)
    
    #Data range filter
    if options[:startDate] or options[:endDate]
      if options[:startDate].class.name != "Time"
        #e.g. Time.parse("21-07-2014 11:41:00")
        startDate = Time.parse(options[:startDate]) rescue 1000.year.ago
      else
        startDate = options[:startDate]
      end
      if options[:endDate].class.name != "Time"
        endDate = Time.parse(options[:endDate]) rescue Time.now
      else
        endDate = options[:endDate]
      end

      opts[:with][:created_at] = startDate..endDate
    end

    #Filter by language
    if options[:language]
      opts[:with][:language] = [options[:language].to_s.to_crc32]
    end

    #Filter by quality score
    if options[:qualityThreshold]
      qualityThreshold = [[0,options[:qualityThreshold].to_i].max,10].min rescue 0
      qualityThreshold = qualityThreshold*100000
      opts[:with][:qscore] = qualityThreshold..1000000
    end


    opts[:without] = {}
    if options[:users_to_avoid] and !options[:users_to_avoid].reject{|u| u.nil?}.empty?
      opts[:without][:owner_id] = Actor.normalize_id(options[:users_to_avoid])
    end
    if opts[:classes].length==1 and ["Excursion"].include? opts[:classes][0].name and options[:ids_to_avoid].is_a? Array and !options[:ids_to_avoid].reject{|id| id.nil?}.empty?
      opts[:without][:id] = options[:ids_to_avoid]
    end

    # (Try to) Avoid nil results (See http://pat.github.io/thinking-sphinx/searching.html#nils)
    opts[:retry_stale] = true
    

    if browse==true
      #Browse
      opts[:match_mode] = :extended

      #Browse can't order by relevance. Set ranking by default.
      if opts[:order].nil?
        opts[:order] = 'ranking DESC'
      end
    else
      queryLength = searchTerms.scan(/\w+/).size

      #Search for some search terms
      if queryLength > 0 and opts[:order].nil?
        # Order by custom weight
        opts[:sort_mode] = :expr
       
        # Ordering by custom weight
        # Documentation: http://pat.github.io/thinking-sphinx/searching/ts2.html#sorting
        # Discussion: http://sphinxsearch.com/forum/view.html?id=3675
        # ThinkingSphinx..search(searchTerms, opts).results[:matches].map{|m| m[:weight]}
        # ThinkingSphinx.search(searchTerms, opts).results[:matches].map{|m| m[:attributes]["@expr"]}

        weights = {}
        weights[:relevance] = 0.80
        weights[:popularity_score] = 0.10
        weights[:quality_score] = 0.10

        orderByRelevance = "1000000*MIN(1,((@weight)/(" + opts[:field_weights][:title].to_s + "*MIN(title_length," + queryLength.to_s + ") + " + opts[:field_weights][:description].to_s + "*MIN(desc_length," + queryLength.to_s + ") + " + opts[:field_weights][:tags].to_s + "*MIN(tags_length," + queryLength.to_s + "))))"
        opts[:order] = weights[:relevance].to_s + "*" + orderByRelevance + " + " + weights[:popularity_score].to_s + "*popularity + " + weights[:quality_score].to_s + "*qscore"
      else
        # Search with an specified order.
        # Search for words with a length shorten than 3 characraters. In this case, the search engine will return empty results.
      end
    end

    return ThinkingSphinx.search searchTerms, opts
  end


  private

  #######################
  ## Utils (private methods)
  #######################

  def self.compose_keywords(user,excursion,options={})
    maxKeywords = 25
    keywords = []
    
    #User tags
    if !user.nil?
      keywords += user.tag_list
    end

    #Excursion tags
    if !excursion.nil?
      keywords += excursion.tag_list
    end

    #Keywords specified in the options
    if options[:keywords].is_a? Array
      keywords += options[:keywords]
    end

    keywords.uniq!

    if options[:test]
      return keywords
    end

    #If keywords are least than the maxKeywords, fill it with additional data about the user
    if !user.nil?
      keywordsMargin = maxKeywords - keywords.length
      if keywordsMargin > 0
        #Tags of the excursions the user created
        allAuthoredKeywords = Excursion.authored_by(user).map{ |e| e.tag_list }.flatten.uniq
        keywords = keywords + allAuthoredKeywords.sample(keywordsMargin)
        keywords.uniq!
      end

      keywordsMargin = maxKeywords - keywords.length
      if keywordsMargin > 0
        #Tags of the excursions the user like
        allLikedKeywords = Activity.joins(:activity_objects).where({:activity_verb_id => ActivityVerb["like"].id, :author_id => user.id}).where("activity_objects.object_type IN (?)", ["Excursion"]).map{ |activity| activity.activity_objects.first.tag_list }.flatten.uniq
        keywords = keywords + allLikedKeywords.sample(keywordsMargin)
        keywords.uniq!
      end
    end

    #Remove unuseful keywords
    keywords.delete_if{|el| ["ViSHCompetition2013"].include? el or el.length < 2}

    return keywords
  end

  def self.search_options(user,excursion,options={})
    opts = {}

    #Logical conector: OR
    opts[:match_mode] = :any
    opts[:rank_mode] = :wordcount
    opts[:per_page] = options[:nMax]
    opts[:field_weights]= {
       :title => 50, 
       :tags => 40,
       :description => 1
    }
    opts[:with] = {}
    opts[:with][:draft] = false

    if !user.nil? or !excursion.nil?
      opts[:without] = {}
      if !user.nil?
        opts[:without][:author_id] = [user.id]
      end
      if !excursion.nil?
        opts[:without][:id] = [excursion.id]
      end
    end

    return opts
  end

  def self.getExcursionsToFill(n,preSelection,user,excursion,options={})
    excursions = []
    nSubset = [80,4*n].max
    ids_to_avoid = getIdsToAvoid(preSelection,excursion)
    excursions = Excursion.joins(:activity_object).where("excursions.draft=false and excursions.id not in (?)", ids_to_avoid).order("activity_objects.ranking DESC").limit(nSubset).sample(n)
  end

  def self.getIdsToAvoid(preSelection,excursion,user=nil)
    ids_to_avoid = preSelection.map{|e| e.id}

    if !excursion.nil?
      ids_to_avoid.push(excursion.id)
    end

    if !user.nil?
      ids_to_avoid.concat(Excursion.authored_by(user).map{|e| e.id})
    end

    ids_to_avoid.uniq!

    if !ids_to_avoid.is_a? Array or ids_to_avoid.empty?
      #if ids=[] the queries may returns [], so we fill it with an invalid id (no excursion will ever have id=-1)
      ids_to_avoid = [-1]
    end

    return ids_to_avoid
  end

  #############
  # Utils to calculate LO similarity and User Profile similarity
  #############

  #Semantic distance (between 0 and 1)
  def self.getSemanticDistance(stringA,stringB)
    if stringA.blank? or stringB.blank?
      return 0
    end

    stringA =  I18n.transliterate(stringA.downcase.strip)
    stringB =  I18n.transliterate(stringB.downcase.strip)

    if stringA == stringB
      return 1
    else
      return 0
    end
  end

  #Semantic distance between keyword arrays (in a 0-1 scale)
  def self.getKeywordsDistance(keywordsA,keywordsB)
    if keywordsA.blank? or keywordsB.blank?
      return 0
    end 

    similarKeywords = 0
    kParam = [keywordsA.length,keywordsB.length].min

    keywordsA.each do |kA|
      keywordsB.each do |kB|
        if getSemanticDistance(kA,kB) == 1
          similarKeywords += 1
          break
        end
      end
    end

    return similarKeywords/kParam.to_f
  end

end