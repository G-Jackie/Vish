class CatalogueController < ApplicationController

  def index
    @default_categories = view_context.getDefaultCategories

    respond_to do |format|
      format.html {
        if request.xhr?
          if params[:category]
            @excursions = view_context.getCategoryResources(params[:category])
            render :partial => 'catalogue/show'
          else
            render :partial => "catalogue/index", :locals =>{ :is_home=> params[:is_home]}
          end
        else
          render :layout => 'catalogue' 
        end
      }    		
    end
  end

  def show
    @category = params[:category]
    @excursions = view_context.getCategoryResources(@category)	
    respond_to do |format|
      format.all { render :layout => 'catalogue' }
    end
  end

end
