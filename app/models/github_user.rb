class GithubUser < ActiveRecord::Base
  validates :github_user_id, uniqueness: true
  belongs_to :user
  has_many :github_repos
end
