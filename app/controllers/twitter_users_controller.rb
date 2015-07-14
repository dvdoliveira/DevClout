class TwitterUsersController < ApplicationController
  def new
    redirect_to '/auth/twitter'
  end

  def create
    @auth = request.env["omniauth.auth"]
  end
end
