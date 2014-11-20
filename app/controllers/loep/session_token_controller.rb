# encoding: utf-8

class Loep::SessionTokenController < ApplicationController
  protect_from_forgery :except => [:index,:create]

  # before_filter :authenticate_user! #Allow anonymous evaluations
  
  # Enable CORS for all methods
  ApplicationController.enable_cors

  ###########
  # API REST for Create Session Tokens
  ###########

  def index
    create
  end

  # POST /loep/session_token
  def create
    Loep.createSessionToken(){|auth_token,c|
      render :json => {auth_token: auth_token}, :content_type => "application/json"
    }
  end

end