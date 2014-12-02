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

class WaContributionsGalleriesController < ApplicationController

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
    [:workshop_id, :wa_assignment_ids=>[]]
  end

  def fill_create_params
    params[:wa_contributions_gallery] ||= {}
    params[:wa_contributions_gallery][:wa_assignment_ids] ||= []

    if params[:wa_contributions_gallery][:wa_assignment_ids].is_a? String
      begin
        params[:wa_contributions_gallery][:wa_assignment_ids] = JSON.parse(params[:wa_contributions_gallery][:wa_assignment_ids])
      rescue
        params[:wa_contributions_gallery][:wa_assignment_ids] = []
      end
    end

    if params[:wa_contributions_gallery][:wa_assignment_ids].blank? and !params[:wa_contributions_gallery][:workshop_id].blank?
      workshop = Workshop.find_by_id(params[:wa_contributions_gallery][:workshop_id])
      unless workshop.nil?
        params[:wa_contributions_gallery][:wa_assignment_ids] = workshop.workshop_activities.select{|workshop_activity| workshop_activity.wa_type=="WaAssignment"}.map{|workshop_activity| workshop_activity.object.id }
      end
    end
  end

end