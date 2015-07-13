class GithubUser < ActiveRecord::Base
  validates :gh_id, uniqueness: true
  belongs_to :user
  has_many :github_repos
end
