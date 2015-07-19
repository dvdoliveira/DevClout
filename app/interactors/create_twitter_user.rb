class CreateTwitterUser
  include Interactor

  def call
    @twitter_user = TwitterUser.create(
      user_id: context.session_user_id,
      access_token: context.auth[:credentials][:token],
      secret: context.auth[:credentials][:secret],
      tw_created_at: context.auth[:extra][:raw_info][:created_at],
      twitter_id: context.auth[:extra][:raw_info][:id],
      screen_name: context.auth[:extra][:raw_info][:screen_name],
      name: context.auth[:extra][:raw_info][:name],
      description: context.auth[:extra][:raw_info][:description],
      lang: context.auth[:extra][:raw_info][:lang],
      location: context.auth[:extra][:raw_info][:location],
      time_zone: context.auth[:extra][:raw_info][:time_zone],
      profile_image_url: context.auth[:extra][:raw_info][:profile_image_url],
      url: context.auth[:info][:urls][:Twitter],
      notifications: context.auth[:extra][:raw_info][:notifications],
      verified: context.auth[:extra][:raw_info][:verified],
      tw_protected: context.auth[:extra][:raw_info][:protected],
      id_str: context.auth[:extra][:raw_info][:id_str],
      favourites_count: context.auth[:extra][:raw_info][:favourites_count],
      followers_count: context.auth[:extra][:raw_info][:followers_count],
      friends_count: context.auth[:extra][:raw_info][:friends_count],
      listed_count: context.auth[:extra][:raw_info][:listed_count],
      statuses_count: context.auth[:extra][:raw_info][:statuses_count]
    )
  end
end
