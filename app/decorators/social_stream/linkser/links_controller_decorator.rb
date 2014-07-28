LinksController.class_eval do

  def allowed_params
    [:url, :image, :callback, :width, :height, :callback_url, :loaded, :language, :age_min, :age_max, :tag_list=>[]]
  end

  def create
    super do |format|
      format.json { render :json => resource }
      format.js { render }
      format.all {redirect_to link_path(resource) || url_for(current_subject)}
  	end
  end
  
end
