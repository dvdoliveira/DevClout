class AddTwitterIdToUser < ActiveRecord::Migration
  def change
    add_column :users, :tw_id, :integer, limit: 5
  end
end
