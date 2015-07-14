class AddColumnsToTwitterUsers < ActiveRecord::Migration
  def change
    add_column :twitter_users, :tw_created_at, :datetime
    add_column :twitter_users, :twitter_id, :integer
    add_column :twitter_users, :screen_name, :string
    add_column :twitter_users, :name, :string
    add_column :twitter_users, :description, :text
    add_column :twitter_users, :lang, :string
    add_column :twitter_users, :location, :string
    add_column :twitter_users, :time_zone, :string
    add_column :twitter_users, :profile_image_url, :string
    add_column :twitter_users, :url, :string
    add_column :twitter_users, :notifications, :boolean
    add_column :twitter_users, :verified, :boolean
    add_column :twitter_users, :protected, :boolean
    add_column :twitter_users, :id_str, :string
    add_column :twitter_users, :favourites_count, :integer
    add_column :twitter_users, :followers_count, :integer
    add_column :twitter_users, :friends_count, :integer
    add_column :twitter_users, :listed_count, :integer
    add_column :twitter_users, :statuses_count, :integer
  end
end
