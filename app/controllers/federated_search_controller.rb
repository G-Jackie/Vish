class FederatedSearchController < ApplicationController
  include ActionView::Helpers::SanitizeHelper

  skip_load_and_authorize_resource :only => [:search]

  # Enable CORS (http://www.tsheffler.com/blog/?p=428) for last_slide, and iframe_api methods
  before_filter :cors_preflight_check, :only => [:search]
  after_filter :cors_set_access_control_headers, :only => [:search]

  #############
  # CORS
  #############
  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  # If this is a preflight OPTIONS request, then short-circuit the
  # request, return only the necessary headers and return an empty
  # text/plain.
  def cors_preflight_check
    if request.method == :options
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version'
      headers['Access-Control-Max-Age'] = '1728000'
      render :text => '', :content_type => 'text/plain'
    end
  end


  #############
  # SEARCH API
  #############

  def search
    unless params[:id].nil?
      response = search_by_id
    else
      limit = [1,[Integer(params[:n]),200].min].max rescue 20

      case params[:sort_by]
      when 'ranking'
        order = 'ranking DESC'
      when 'popularity'
        order = 'popularity DESC'
      when 'modification'
        order = 'updated_at DESC'
      when 'creation'
        order = 'created_at DESC'
      when 'visits'
        order = 'visit_count DESC'
      when 'favorites'
        order = 'like_count DESC'
      when 'quality'
        order = 'qscore DESC'
      else
        #order by relevance
        order = nil
      end

      type = processTypeParam(params[:type])

      searchEngineResults = RecommenderSystem.search({:keywords=>params[:q], :n=>limit, :page => params[:page], :order => order, :models => type[:models], :subtypes => type[:subtypes], :startDate => params[:startDate], :endDate => params[:endDate], :language => params[:language], :qualityThreshold => params[:qualityThreshold]})

      response = Hash.new
      response["total_results"] = [searchEngineResults.total_entries,5000].min
      response["total_results_delivered"] = searchEngineResults.length
      unless params[:page].nil?
        response["total_pages"] = searchEngineResults.total_pages
        response["page"] = searchEngineResults.current_page
        response["results_per_page"] = searchEngineResults.per_page
      end
      response["results"] = searchEngineResults.map{|r| r.search_json(self)}
    end

    respond_to do |format|
      format.any {
        render :json => response, :content_type => 'json'
      }
    end
  end

  def processTypeParam(type)
    # Possible models
    # ["User", "Category", "Event", "Excursion", "Document", "Link", "Embed", "Webapp", "Scormfile"]
    # and the document subclasses also ["Picture","Audio","Video",...]

    models = []
    subtypes = []

    unless type.nil?
      acceptedSubtypes = {
        "Resource" => [Excursion,Document,Link,Embed,Webapp,Scormfile]
      }

      type.split(",").each do |type|
        if acceptedSubtypes[type].nil?
          #Find model
          model = type.singularize.classify.constantize rescue nil
          unless model.nil?
            models.push(model)
          end
        else
          #Is a subtype
          models.concat(acceptedSubtypes[type])
          subtypes.push(type)
        end
      end
    end

    if models.empty?
      #Default models
      models = [Excursion,Document,Link,Embed,Webapp,Scormfile]
      subtypes = []
    end

    models.uniq!
    subtypes.uniq!

    return {
      :models => models,
      :subtypes => subtypes
    }
  end

  #Search elements by universal Ids
  def search_by_id
    object = ActivityObject.getObjectFromUniversalId(params[:id])
    unless object.nil?
      object.search_json(self)
    else
      {}
    end
  end

end

          