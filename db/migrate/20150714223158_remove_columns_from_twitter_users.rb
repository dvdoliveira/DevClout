class RemoveColumnsFromTwitterUsers < ActiveRecord::Migration
  def change
    remove_column :twitter_users, :email
    remove_column :twitter_users, :full_name
    remove_column :twitter_users, :password
    remove_column :twitter_users, :user_type
    remove_column :twitter_users, :user_score
    remove_column :twitter_users, :user_name
    remove_column :twitter_users, :bio
    remove_column :twitter_users, :blog
  end
end
