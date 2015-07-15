class TwitterUsersController < ApplicationController
  def new
    redirect_to '/auth/twitter'
  end

  def create
    @auth = request.env["omniauth.auth"]
    @twitter_user = TwitterUser.find_by(twitter_id: @auth[:extra][:raw_info][:id])
    unless @twitter_user then
      @twitter_user = TwitterUser.create(
        user_id: session[:user_id],
        access_token: @auth[:credentials][:token],
        secret: @auth[:credentials][:secret],
        tw_created_at: @auth[:extra][:raw_info][:created_at],
        twitter_id: @auth[:extra][:raw_info][:id],
        screen_name: @auth[:extra][:raw_info][:screen_name],
        name: @auth[:extra][:raw_info][:name],
        description: @auth[:extra][:raw_info][:description],
        lang: @auth[:extra][:raw_info][:lang],
        location: @auth[:extra][:raw_info][:location],
        time_zone: @auth[:extra][:raw_info][:time_zone],
        profile_image_url: @auth[:extra][:raw_info][:profile_image_url],
        url: @auth[:info][:urls][:Twitter],
        notifications: @auth[:extra][:raw_info][:notifications],
        verified: @auth[:extra][:raw_info][:verified],
        tw_protected: @auth[:extra][:raw_info][:protected],
        id_str: @auth[:extra][:raw_info][:id_str],
        favourites_count: @auth[:extra][:raw_info][:favourites_count],
        followers_count: @auth[:extra][:raw_info][:followers_count],
        friends_count: @auth[:extra][:raw_info][:friends_count],
        listed_count: @auth[:extra][:raw_info][:listed_count],
        statuses_count: @auth[:extra][:raw_info][:statuses_count]
      )
    end
    redirect_to profile_path
  end
end
