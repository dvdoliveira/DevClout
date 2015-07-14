class RemoveFk < ActiveRecord::Migration
  def change
    remove_foreign_key :twitter_users, :users
    remove_foreign_key :statistics, :users
    remove_foreign_key :stack_users, :users
    remove_foreign_key :github_users, :users
    remove_foreign_key :github_repos, :github_users
  end
end
