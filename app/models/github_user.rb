class GithubUser < ActiveRecord::Base
  belongs_to :user
  has_many :github_repo
end
