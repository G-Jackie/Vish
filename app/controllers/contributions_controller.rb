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

class ContributionsController < ApplicationController
  before_filter :authenticate_user!
  before_filter :fill_create_params, :only => [:create]
  inherit_resources

  #############
  # REST methods
  #############

  def show
    super do |format|
      format.html {
        redirect_to polymorphic_path(resource.activity_object.object, :contribution => true)
      }
    end
  end

  def new
    super do |format|
      format.html {
        if params[:type]
          render "new_" + params[:type]
        else
          render "new"
        end
      }
    end
  end

  def create
    if params["contribution"]["wa_assignment_id"].present?
      wassignment = WaAssignment.find_by_id(params["contribution"]["wa_assignment_id"])
      workshop = wassignment.workshop unless wassignment.nil?
    else
      #Get resource from which the contribution is being created...
    end

    case params["contribution"]["type"]
    when "document"
      object = Document.new((params["document"].merge!(params["contribution"]["activity_object"])).permit!)
    when "writing"
      object = Writing.new((params["writing"].merge!(params["contribution"]["activity_object"])).permit!)
    else
      flash[:errors] = "Invalid contribution"
      if !workshop.nil?
        return redirect_to workshop_path(workshop)
      else
        return redirect_to "/"
      end
    end

    object.valid?

    if object.errors.blank? and object.save
      ao = object.activity_object
      discard_flash
    else
      flash[:errors] = object.errors.full_messages.to_sentence
      if !workshop.nil?
        return redirect_to workshop_path(workshop)
      else
        return redirect_to "/"
      end
    end
    
    params["contribution"].delete "activity_object"
    params["contribution"].delete "type"
    params["contribution"]["activity_object_id"] = ao.id

    super do |format|
      format.html {
        unless resource.errors.blank?
          flash[:errors] = resource.errors.full_messages.to_sentence
          if !workshop.nil?
            return redirect_to workshop_path(workshop)
          else
            return redirect_to "/"
          end
        else
          discard_flash
          return redirect_to contribution_path(resource)
        end
      }
    end
  end

  def edit
    super
  end
 

  private

  def allowed_params
    [:wa_assignment_id, :activity_object_id]
  end

  def fill_create_params
    params["contribution"] ||= {}
    params["contribution"]["activity_object"] ||= {}
    params["contribution"]["activity_object"]["scope"] = "1" #private
    unless current_subject.nil?
      params["contribution"]["activity_object"]["owner_id"] = current_subject.actor_id
      params["contribution"]["activity_object"]["author_id"] = current_subject.actor_id
      params["contribution"]["activity_object"]["user_author_id"] = current_subject.actor_id
    end
  end

end