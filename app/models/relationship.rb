class Relationship < ActiveRecord::Base
  belongs_to :user, class_name: "User", primary_key: "tw_id"
  belongs_to :follower, class_name: "User", primary_key: "tw_id"
  belongs_to :followed, class_name: "User", primary_key: "tw_id" 

  validates :follower_id, presence: true
  validates :followed_id, presence: true
end