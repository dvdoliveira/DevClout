class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true
  validates :full_name,presence: true
  validates :user_type,presence: true
  validates :user_score, numericality: true
  validates :user_name,uniqueness: true
  has_many :statistic
end
