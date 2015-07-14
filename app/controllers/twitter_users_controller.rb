class TwitterUsersController < ApplicationController
  def new
    redirect_to '/auth/twitter'
  end

  def create
    @auth = request.env["omniauth.auth"]

    @twitter_user = TwitterUser.find_by()

  end
end
