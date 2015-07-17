class TwitterUser < ActiveRecord::Base
  belongs_to :user
  after_commit :update_users_twitter_averages

  protected 

  def update_users_twitter_averages
    Average.update_twitter_averages
  end

end
