# CONTROLLER DEPRECATED

class ResourcesController < ApplicationController
  include HomeHelper

  def search
    headers['Last-Modified'] = Time.now.httpdate

    @found_resources = if params[:scope].present? and params[:scope] == "like"
      subject_resources search_subject, { :scope => :like, :limit => params[:per_page].to_i } # This WON'T search... it's a scam
    elsif params[:live].present?
      ThinkingSphinx.search params[:q], search_options.deep_merge!( { :classes => [Embed, Swf, Link] } )
    elsif params[:object].present?
      ThinkingSphinx.search params[:q], search_options.deep_merge!( { :classes => [Embed, Swf, Officedoc, Link, Scormfile, Webapp] } )
    else
      ThinkingSphinx.search params[:q], search_options.deep_merge!( { :classes => [Embed, Swf, Officedoc, Link, Video, Audio, Scormfile, Webapp] } )
    end
    respond_to do |format|
      format.html {
         if @found_resources.size == 0 and params[:scope].present? and params[:scope] == "like"
           render :partial => "common_documents/fav_zero_screen"
         else
           render :layout => false
         end
      }
      format.json {
        json = []
        @found_resources.each_with_index do |res,i| 
          if !res.nil?
            rec = Hash.new
            rec["id"] = res.id.to_s
            rec["title"] = res.title
            rec["description"] = res.description
            rec["author"] = res.author.name
            if res.is_a? Embed
              rec["object"] = res.fulltext
            elsif res.is_a? Link
              rec["object"] = res.url
            elsif res.is_a? Scormfile
              rec["object"] = res.lourl
              rec["type"] = "scormpackage"
            elsif res.is_a? Webapp
              rec["object"] = res.lourl
              rec["type"] = "webapp"
            else
              rec["object"] = 'http://' + request.env['HTTP_HOST'] + res.file.to_s.downcase
            end
            json.push(rec)
          end
        end

        render :json => json        
      }  
    end
  end

  private
  def search_options
    opts = search_scope_options

    # search only live resources
    if params[:live].present?
      opts.deep_merge!( { :with => { :live => true } } )
    end

    # Pagination
    opts.merge!({
      :order => :created_at,
      :sort_mode => :desc,
      :per_page => params[:per_page] || 20,
      :page => params[:page]
    })

      opts
  end

  def search_subject
    return current_subject if request.referer.blank?
    @search_subject ||=
      ( Actor.find_by_slug(URI(request.referer).path.split("/")[2]) || current_subject )
  end

  def search_scope_options
    if params[:scope].blank? || search_subject.blank?
      return {}
    end

    case params[:scope]
    when "me"
      { :with => { :author_id => [ search_subject.id ] } }
    when "net"
      { :with => { :author_id => search_subject.following_actor_ids } }
    when "other"
      { :without => { :author_id => search_subject.following_actor_and_self_ids } }
    else
      raise "Unknown search scope #{ params[:scope] }"
    end
  end

end
