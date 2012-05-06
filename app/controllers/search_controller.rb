class SearchController < ApplicationController
  include ActionView::Helpers::SanitizeHelper

  helper_method :get_search_query

  RESULTS_SEARCH_PER_PAGE=12
  MIN_QUERY=2
  def index
    @search_result =
      if params[:q].blank?
        search :extended # TODO: this should have :match_mode => :fullscan for efficiency
      elsif too_short_query
        []
      elsif params[:mode].eql? "header_search"
        search :quick
      else
        search :extended
      end

    respond_to do |format|
      format.html {
        if params[:mode] == "header_search"
          render :partial => "header_search"
        end
      }

      format.json {
        json_obj = (
          params[:type].present? ?
          { params[:type].pluralize => @search_result } :
          @search_result
        )

        render :json => json_obj
      }

      format.js
    end
  end

  private

  def search mode
    result = SocialStream::Search.search(get_search_query,
                                         current_subject,
                                         :mode => mode,
                                         :key  => params[:type])

    if mode.to_s.eql? "quick"
      result = Kaminari.paginate_array(result).page(1).per(4)
    else
      result = Kaminari.paginate_array(result).page(params[:page]).per(RESULTS_SEARCH_PER_PAGE)
    end

    result
  end

  def too_short_query
    bare_query = strip_tags(params[:q]) unless bare_query.html_safe?
    return bare_query.strip.size < MIN_QUERY
  end

  def get_search_query
    search_query = ""
    param = strip_tags(params[:q]) || ""
    bare_query = param unless bare_query.html_safe?
    search_query_words = bare_query.strip.split
    search_query_words.each_index do |i|
      search_query+= search_query_words[i] + " " if i < (search_query_words.size - 1)
      search_query+= "*" + search_query_words[i] + "* " if i == (search_query_words.size - 1)
    end
    return search_query.strip
  end
end
