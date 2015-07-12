class AddUserTypeTogithubUsers < ActiveRecord::Migration
  def change
    add_column :github_users, :user_type, :string
    remove_column :github_users, :type, :string
  end
end
