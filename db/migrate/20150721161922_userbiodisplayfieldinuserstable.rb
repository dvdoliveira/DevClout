class Userbiodisplayfieldinuserstable < ActiveRecord::Migration
  def change
    add_column :users, :user_bio_display, :string
    add_column :users, :user_full_name_display, :string
    add_column :users, :user_email_display, :string
    add_column :users, :user_blog_display, :string
  end
end
