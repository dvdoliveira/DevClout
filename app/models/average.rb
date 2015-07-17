class Average < ActiveRecord::Base

  @github_users = GithubUser.all;
  @average = Average.find_by(id: 1)

  def self.update_github_averages
    @average.update_attribute(:gh_users_followers, @github_users.average(:followers))
  end
  
end