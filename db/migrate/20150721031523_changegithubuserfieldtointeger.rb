class Changegithubuserfieldtointeger < ActiveRecord::Migration
  def change
    remove_column :github_users, :gh_id, :string
    add_column :github_users, :gh_id, :integer
  end
end
