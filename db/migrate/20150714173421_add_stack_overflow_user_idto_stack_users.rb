class AddStackOverflowUserIdtoStackUsers < ActiveRecord::Migration
  def change
    add_column :stack_users, :so_user_id, :integer
  end
end
