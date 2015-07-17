class TwitterUsersController < ApplicationController
  def new
    redirect_to '/auth/twitter'
  end

  def create
    @auth = request.env["omniauth.auth"]
    @twitter_user = TwitterUser.find_by(twitter_id: @auth[:extra][:raw_info][:id])
    unless @twitter_user then
      new_user_twitter = CreateTwitterFollowers.call({auth: @auth, session_user_id: session[:user_id]})
    end
    redirect_to profile_path
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
