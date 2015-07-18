class ChangeUserColumns < ActiveRecord::Migration
  def change
    add_column :users, :user_level, :string
    change_column :users, :user_score, :integer, default: 0
  end
end
