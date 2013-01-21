class EmbedsController < ApplicationController
  before_filter :authenticate_user!, :only => [ :create, :update ]
  before_filter :hack_auth, :only => :create
  include SocialStream::Controllers::Objects

  def create
    super do |format|
      format.json { render :json => resource }
      format.js{ render }
      format.all {redirect_to embed_path(resource) || home_path}
    end
  end

  def update
    super
  end

  def destroy
    destroy!
  end

  private

  def allowed_params
    [:fulltext, :width, :height, :live]
  end

  def hack_auth
    params["embed"] ||= {}
    params["embed"]["relation_ids"] = [Relation::Public.instance.id]
    params["embed"]["owner_id"] = current_subject.actor_id
  end
end

