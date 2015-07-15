class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true
  validates :full_name,presence: true
  validates :user_type,presence: true
  validates :user_name,uniqueness: true
  has_many :statistics
  has_one :github_user
  has_one :stack_user
  has_one :twitter_user

  def followers_to_following
    if self.github_user.following > 0
      self.github_user.followers / self.github_user.following
    else
      0
    end
  end

  def avg_user_score
    User.all.sum(:user_score)
  end
end
