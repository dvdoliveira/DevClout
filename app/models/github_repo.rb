class GithubRepo < ActiveRecord::Base
  belongs_to :github_user , :foreign_key => 'gh_id'
end
