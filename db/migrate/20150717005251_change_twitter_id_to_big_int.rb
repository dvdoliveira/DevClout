class ChangeTwitterIdToBigInt < ActiveRecord::Migration
  def change
    change_column :twitter_users, :twitter_id, :integer, :limit => 5
  end
end
