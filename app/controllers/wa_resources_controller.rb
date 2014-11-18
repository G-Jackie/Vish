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

class WaResourcesController < ApplicationController

  before_filter :authenticate_user!
  before_filter :fill_create_params, :only => [:create, :update]
  inherit_resources

  load_and_authorize_resource
  skip_after_filter :discard_flash, :only => [:create, :update]

  #############
  # REST methods
  #############

  def create
    super do |format|
      format.html {
        unless resource.errors.blank?
          flash[:errors] = resource.errors.full_messages.to_sentence
        else
          discard_flash
        end
        
        redirect_to edit_workshop_path(resource.workshop)
      }
    end
  end

  def edit
    if params["format"]=="partial"
      super do |format|
        format.partial
      end
    end
  end

  def update   
    super do |format|
      format.html {
        unless resource.errors.blank?
          flash[:errors] = resource.errors.full_messages.to_sentence
        else
          discard_flash
        end
        redirect_to edit_workshop_path(resource.workshop)
      }
    end
  end

  def destroy
    destroy! do |format|
      format.all {
        redirect_to edit_workshop_path(resource.workshop) 
      }
    end
  end


  private

  def allowed_params
    [:workshop_id, :activity_object_id]
  end

  def fill_create_params
    params["wa_resource"] ||= {}
    unless params["url"].blank?
      the_resource = ActivityObject.getObjectFromUrl(params["url"])
      unless the_resource.nil? or the_resource.activity_object.nil?
        params["wa_resource"]["activity_object_id"] = the_resource.activity_object.id
      end
    end
  end

end