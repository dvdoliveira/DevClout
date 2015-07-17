class GithubUser < ActiveRecord::Base
  validates :gh_id, uniqueness: true
  belongs_to :user
  has_many :github_repos
  after_commit :update_github_averages

  protected 

  def update_github_averages
    Average.update_github_averages
  end
  
end
