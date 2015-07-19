class Relationship < ActiveRecord::Base
  belongs_to :follower, class_name: "User", foreign_key: "twitter_id"
  belongs_to :followed, class_name: "User", foreign_key: "twitter_id"

  validates :follower_id, presence: true
  validates :followed_id, presence: true
end