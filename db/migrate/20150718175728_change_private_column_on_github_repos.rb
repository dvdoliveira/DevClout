class ChangePrivateColumnOnGithubRepos < ActiveRecord::Migration
  def change
    rename_column :github_repos, :private, :gh_private
  end
end
