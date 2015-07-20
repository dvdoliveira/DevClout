class Addrepoidfieldingithubrepotable < ActiveRecord::Migration
  def change
    add_column :github_repos, :repo_id, :integer
  end
end
