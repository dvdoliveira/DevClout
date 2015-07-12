class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true
  validates :full_name,presence: true
  validates :user_type,presence: true
  validates :user_name,uniqueness: true
  has_many :statistics
  has_one :github_user
  has_one :stack_user
  has_one :twitter_user
end
