# encoding: utf-8
TRS_FILE_PATH = "reports/trsystem.txt";

namespace :trsystem do

  #Usage
  #Development:   bundle exec rake trsystem:all
  #In production: bundle exec rake trsystem:all RAILS_ENV=production
  task :all => :environment do
    Rake::Task["trsystem:prepare"].invoke
    Rake::Task["trsystem:usage"].invoke(false)
    Rake::Task["trsystem:rs"].invoke(false)
    Rake::Task["trsystem:rsViSH"].invoke(false)
  end

  task :prepare do
    require "#{Rails.root}/lib/task_utils"
    prepareFile(TRS_FILE_PATH)
    writeInTRS("Tracking System Report")
  end

  task :usage, [:prepare] => :environment do |t,args|
    args.with_defaults(:prepare => true)

    if args.prepare
      Rake::Task["trsystem:prepare"].invoke
    end

    writeInTRS("")
    writeInTRS("Usage Report")
    writeInTRS("")

    vvEntries = TrackingSystemEntry.where(:app_id=>"ViSH Viewer")

    #Time period
    #Entries of the last 3 months
    # endDate = Time.now
    # startDate = endDate.advance(:months => -3)
    # vvEntries = vvEntries.where(:created_at => startDate..endDate)

    totalSamples = 0
    totalSlides = 0
    totalDuration = 0

    vvEntries.each do |e|
      # begin
        d = JSON(e["data"]) rescue {}

        unless d["chronology"].nil? or d["duration"].nil?
          # chronologyEntries = d["chronology"].values
          nSlides = d["chronology"].values.map{|c| c["slideNumber"]}.uniq.length
          # tDuration = chronologyEntries.map{|c| c["duration"].to_f}.sum
          tDuration = d["duration"].to_f

          #Filter extremely long and short durations
          MAX_DURATION = 1.5*60*60 #1.5 hours
          MIN_DURATION = 10 #10 secs

          if nSlides.is_a? Integer and tDuration.is_a? Float and nSlides>0 and tDuration>MIN_DURATION and tDuration<MAX_DURATION
            totalSlides += nSlides
            totalDuration += tDuration
            totalSamples += 1
          end
        end
      # rescue
      # end
    end

    writeInTRS("Total samples")
    writeInTRS(totalSamples)
    writeInTRS("Average time per slide:")
    if totalDuration > 0
      writeInTRS((totalDuration/totalSlides.to_f).round(2).to_s + " (s)")
    else
      writeInTRS("0 (s)")
    end

  end

  #Usage
  #Development:   bundle exec rake trsystem:rs
  #In production: bundle exec rake trsystem:rs RAILS_ENV=production
  task :rs, [:prepare] => :environment do |t,args|
    args.with_defaults(:prepare => true)

    if args.prepare
      Rake::Task["trsystem:prepare"].invoke
    end

    writeInTRS("")
    writeInTRS("Recommender System Report. ViSH Viewer data")
    writeInTRS("")

    vvEntries = TrackingSystemEntry.where(:app_id=>"ViSH Viewer")

    recTSD = {}

    recTSD["Random"] = {}
    recTSD["Random"]["totalRec"] = 0
    recTSD["Random"]["totalRecShow"] = 0
    recTSD["Random"]["totalRecAccepted"] = 0
    recTSD["Random"]["totalRecDenied"] = 0
    recTSD["Random"]["timeToAccept"] = []

    recTSD["ViSHRecommenderSystem"] = {}
    recTSD["ViSHRecommenderSystem"]["totalRec"] = 0
    recTSD["ViSHRecommenderSystem"]["totalRecShow"] = 0
    recTSD["ViSHRecommenderSystem"]["totalRecAccepted"] = 0
    recTSD["ViSHRecommenderSystem"]["totalRecDenied"] = 0
    recTSD["ViSHRecommenderSystem"]["timeToAccept"] = []

    #Compare Accepted group vs Denied group
    recTSD["ViSHRecommenderSystem"]["accepted"] = []
    recTSD["ViSHRecommenderSystem"]["denied"] = []


    vvEntries.each do |e|
      d = JSON(e["data"]) rescue {}
      recData = d["rs"]
      unless recData.nil? or !recData["tdata"].is_a? Hash
        firstItem = recData["tdata"].values.first
        rsItemTrackingData = JSON(firstItem["recommender_data"]) rescue nil
        unless rsItemTrackingData.nil? or !["Random","ViSHRecommenderSystem"].include? rsItemTrackingData["rec"]
          thisRecTSD = recTSD[rsItemTrackingData["rec"]]
          thisRecTSD["totalRec"] += 1

          if recData["shown"]=="true" || recData["shown"]==true
            thisRecTSD["totalRecShow"] += 1
          end

          if recData["accepted"] == "false" or recData["accepted"]==false
            thisRecTSD["totalRecDenied"] += 1
          elsif recData["accepted"] == "undefined"
            #Do nothing
          elsif recData["accepted"].is_a? String
            thisRecTSD["totalRecAccepted"] += 1

            #When accepted, measure time.
            allActions = d["chronology"].values.map{|c| c["actions"].values}.flatten rescue []
            onShowRecommendationAction = allActions.select{|a| a["id"]=="onShowRecommendations" }.last
            onAcceptRecommendationAction = allActions.select{|a| a["id"]=="onAcceptRecommendation" }.last

            if !onShowRecommendationAction.nil? and !onAcceptRecommendationAction.nil? and !onShowRecommendationAction["t"].nil? and !onAcceptRecommendationAction["t"].nil?
              recTime = (onAcceptRecommendationAction["t"].to_f - onShowRecommendationAction["t"].to_f).round(2)
              if recTime > 0
                thisRecTSD["timeToAccept"].push(recTime)
              end
            end

            #When accepted, and RS is ViSHRecommender, store accepted and denied items
            if rsItemTrackingData["rec"] == "ViSHRecommenderSystem"
              acceptedItem = recData["tdata"].values.select{|item| item["id"]==recData["accepted"]}[0]
              acceptedItemData = JSON(acceptedItem["recommender_data"])
              recTSD["ViSHRecommenderSystem"]["accepted"].push(acceptedItemData)

              deniedItemsLength = recData["tdata"].values.select{|item| item["id"]!=recData["accepted"]}
              deniedItemsLengthData = deniedItemsLength.map{|item| JSON(item["recommender_data"])}
              recTSD["ViSHRecommenderSystem"]["denied"] += deniedItemsLengthData
            end
          end
        end
      end
    end


    ###############
    # ViSH Recommender System vs Random
    ###############

    if recTSD["Random"]["timeToAccept"].length > 0
      randomAverageTimeToAccept = (recTSD["Random"]["timeToAccept"].sum/recTSD["Random"]["timeToAccept"].size.to_f).round(2)
    else
      randomAverageTimeToAccept = 0
    end

    if recTSD["ViSHRecommenderSystem"]["timeToAccept"].length > 0
      vishRSAverageTimeToAccept = (recTSD["ViSHRecommenderSystem"]["timeToAccept"].sum/recTSD["ViSHRecommenderSystem"]["timeToAccept"].size.to_f).round(2)
    else
      vishRSAverageTimeToAccept = 0
    end

    writeInTRS("")
    writeInTRS("Recommender System: Random")
    writeInTRS("Showed Recommendations:")
    writeInTRS(recTSD["Random"]["totalRecShow"])
    writeInTRS("Accepted Recommendations:")
    writeInTRS(recTSD["Random"]["totalRecAccepted"])
    writeInTRS("Denied Recommendations:")
    writeInTRS(recTSD["Random"]["totalRecDenied"])
    writeInTRS("Average time to accept a recommendation:")
    writeInTRS(randomAverageTimeToAccept)
    
    writeInTRS("")
    writeInTRS("Recommender System: ViSH Recommender")
    writeInTRS("Showed Recommendations:")
    writeInTRS(recTSD["ViSHRecommenderSystem"]["totalRecShow"])
    writeInTRS("Accepted Recommendations:")
    writeInTRS(recTSD["ViSHRecommenderSystem"]["totalRecAccepted"])
    writeInTRS("Denied Recommendations:")
    writeInTRS(recTSD["ViSHRecommenderSystem"]["totalRecDenied"])
    writeInTRS("Average time to accept a recommendation:")
    writeInTRS(vishRSAverageTimeToAccept)


    ###############
    # Accepted vs denied LOs
    ###############

    acceptedItemsLength = [1,recTSD["ViSHRecommenderSystem"]["accepted"].length].max
    deniedItemsLength = [1,recTSD["ViSHRecommenderSystem"]["denied"].length].max

    accceptedAverageOverallScore = (recTSD["ViSHRecommenderSystem"]["accepted"].map{|i| i["overall_score"]}.sum/acceptedItemsLength.to_f).round(4)
    deniedAverageOverallScore = (recTSD["ViSHRecommenderSystem"]["denied"].map{|i| i["overall_score"]}.sum/deniedItemsLength.to_f).round(4)

    accceptedAverageCSScore = (recTSD["ViSHRecommenderSystem"]["accepted"].map{|i| i["cs_score"]}.sum/acceptedItemsLength.to_f).round(4)
    deniedAverageCSScore = (recTSD["ViSHRecommenderSystem"]["denied"].map{|i| i["cs_score"]}.sum/deniedItemsLength.to_f).round(4)

    accceptedAverageUSScore = (recTSD["ViSHRecommenderSystem"]["accepted"].reject{|i| i["us_score"].nil?}.map{|i| i["us_score"]}.sum/acceptedItemsLength.to_f).round(4)
    deniedAverageUSScore = (recTSD["ViSHRecommenderSystem"]["denied"].reject{|i| i["us_score"].nil?}.map{|i| i["us_score"]}.sum/deniedItemsLength.to_f).round(4)

    accceptedAveragePopularityScore = (recTSD["ViSHRecommenderSystem"]["accepted"].map{|i| i["popularity_score"]}.sum/acceptedItemsLength.to_f).round(4)
    deniedAveragePopularityScore = (recTSD["ViSHRecommenderSystem"]["denied"].map{|i| i["popularity_score"]}.sum/deniedItemsLength.to_f).round(4)

    accceptedAverageQualityScore = (recTSD["ViSHRecommenderSystem"]["accepted"].map{|i| i["quality_score"]}.sum/acceptedItemsLength.to_f).round(4)
    deniedAverageQualityScore = (recTSD["ViSHRecommenderSystem"]["denied"].map{|i| i["quality_score"]}.sum/deniedItemsLength.to_f).round(4)

    writeInTRS("")
    writeInTRS("Group of accepted LOs")
    writeInTRS("Overall score:")
    writeInTRS(accceptedAverageOverallScore)
    writeInTRS("Content similarity score:")
    writeInTRS(accceptedAverageCSScore)
    writeInTRS("User similarity score:")
    writeInTRS(accceptedAverageUSScore)
    writeInTRS("Popularity score:")
    writeInTRS(accceptedAveragePopularityScore)
    writeInTRS("Quality score:")
    writeInTRS(accceptedAverageQualityScore)

    writeInTRS("")
    writeInTRS("Group of denied LOs")
    writeInTRS("Overall score:")
    writeInTRS(deniedAverageOverallScore)
    writeInTRS("Content similarity score:")
    writeInTRS(deniedAverageCSScore)
    writeInTRS("User similarity score:")
    writeInTRS(deniedAverageUSScore)
    writeInTRS("Popularity score:")
    writeInTRS(deniedAveragePopularityScore)
    writeInTRS("Quality score:")
    writeInTRS(deniedAverageQualityScore)
  end

  #Usage
  #Development:   bundle exec rake trsystem:rsViSH
  #In production: bundle exec rake trsystem:rsViSH RAILS_ENV=production
  task :rsViSH, [:prepare] => :environment do |t,args|
    args.with_defaults(:prepare => true)

    if args.prepare
      Rake::Task["trsystem:prepare"].invoke
    end

    writeInTRS("")
    writeInTRS("Recommender System Report. ViSH data")
    writeInTRS("")

    vEntries = TrackingSystemEntry.where(:app_id=>"ViSH RLOsInExcursions")

    results = {}
    results["samples"] = 0
    results["rec"] = 0
    results["norec"] = 0

    vEntries.each do |e|
      d = JSON(e["data"]) rescue {}
      unless d.nil? or d["rec"].nil?
        results["samples"] += 1
        if d["rec"]==false or d["rec"]=="false"
          results["norec"] += 1
        else
          results["rec"] += 1
        end
      end
    end

    #Integrate data from the VV tracker
    if vEntries.length > 0
      VVacceptedRecomendations = 0
      VVacceptedRecomendationsLoggedUsers = 0
      VVacceptedRecomendationsNonLoggedUsers = 0
      startDate = vEntries.minimum(:created_at)
      endDate = vEntries.maximum(:created_at)
      vvEntries = TrackingSystemEntry.where(:app_id=>"ViSH Viewer", :created_at => startDate..endDate)
      vvEntries.each do |e|
        d = JSON(e["data"]) rescue {}
        userData = d["user"]
        recData = d["rs"]
        unless recData.nil? or !recData["tdata"].is_a? Hash
          firstItem = recData["tdata"].values.first
          rsItemTrackingData = JSON(firstItem["recommender_data"]) rescue nil
          unless rsItemTrackingData.nil?
            if recData["accepted"] == "false" or recData["accepted"]==false or recData["accepted"] == "undefined"
              #Do nothing
            elsif recData["accepted"].is_a? String
              if userData.nil?
                VVacceptedRecomendationsNonLoggedUsers += 1
              else
                VVacceptedRecomendationsLoggedUsers += 1
              end
              VVacceptedRecomendations += 1
            end
          end
        end
      end

      if VVacceptedRecomendations>0
        results["norec"] -= VVacceptedRecomendations
        results["rec"] += VVacceptedRecomendations
      end
    end

    writeInTRS("")
    writeInTRS("Total samples")
    writeInTRS(results["samples"])
    writeInTRS("Access by recommendation")
    writeInTRS(results["rec"])
    writeInTRS("Other access")
    writeInTRS(results["norec"])

    ###############
    # Logged vs Non Loggued users
    ###############

    results["logged"] = {}
    results["logged"]["samples"] = 0
    results["logged"]["rec"] = 0
    results["logged"]["norec"] = 0

    results["nonlogged"] = {}
    results["nonlogged"]["samples"] = 0
    results["nonlogged"]["rec"] = 0
    results["nonlogged"]["norec"] = 0

    vEntries.each do |e|
      d = JSON(e["data"]) rescue {}
      unless d.nil? or d["rec"].nil? or !d["current_subject"].is_a? String
        if d["current_subject"] == "anonymous"
          results["nonlogged"]["samples"] += 1
          if d["rec"]==false or d["rec"]=="false"
            results["nonlogged"]["norec"] += 1
          else
            results["nonlogged"]["rec"] += 1
          end
        else
          results["logged"]["samples"] += 1
          if d["rec"]==false or d["rec"]=="false"
            results["logged"]["norec"] += 1
          else
            results["logged"]["rec"] += 1
          end
        end
      end
    end

    if VVacceptedRecomendationsLoggedUsers>0
      results["logged"]["norec"] -= VVacceptedRecomendationsLoggedUsers
      results["logged"]["rec"] += VVacceptedRecomendationsLoggedUsers
    end

    if VVacceptedRecomendationsNonLoggedUsers>0
      results["nonlogged"]["norec"] -= VVacceptedRecomendationsNonLoggedUsers
      results["nonlogged"]["rec"] += VVacceptedRecomendationsNonLoggedUsers
    end

    writeInTRS("")
    writeInTRS("Loggued users")
    writeInTRS("Total samples")
    writeInTRS(results["logged"]["samples"])
    writeInTRS("Access by recommendation")
    writeInTRS(results["logged"]["rec"])
    writeInTRS("Other access")
    writeInTRS(results["logged"]["norec"])
    writeInTRS("")
    writeInTRS("Non loggued users")
    writeInTRS("Total samples")
    writeInTRS(results["nonlogged"]["samples"])
    writeInTRS("Access by recommendation")
    writeInTRS(results["nonlogged"]["rec"])
    writeInTRS("Other access")
    writeInTRS(results["nonlogged"]["norec"])

  end

  def writeInTRS(line)
    write(line,TRS_FILE_PATH)
  end

end
