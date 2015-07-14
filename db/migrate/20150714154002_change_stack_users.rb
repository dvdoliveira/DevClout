class ChangeStackUsers < ActiveRecord::Migration
  def change
    add_column :stack_users, :access_token, :string
    remove_column :stack_users, :accept_rate
    remove_column :stack_users, :timed_penalty_date
  end
end
