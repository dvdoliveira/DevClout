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
    update_user_twitter_id(@twitter_user)
    save_twitter_followers_to_relationships(@twitter_user)
    save_twitter_following_to_relationships(@twitter_user)
  end

  def update_user_twitter_id(user)
    @user = User.find_by(id: user.user.id)
    @user.update_attribute(:tw_id, user.twitter_id)
  end

  def save_twitter_followers_to_relationships(user)
    @followers = $twitter.follower_ids(user.screen_name)
    @followers.each do |follower|
      Relationship.create(
        follower_id: follower,
        followed_id: user.twitter_id
      )
    end
  end

  def save_twitter_following_to_relationships(user)
    @following = $twitter.friend_ids(user.screen_name)
    @following.each do |following|
      Relationship.create(
        follower_id: user.twitter_id,
        followed_id: following
      )
    end
  end
end
