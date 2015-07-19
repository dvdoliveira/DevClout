class Changefieldtypeforscore < ActiveRecord::Migration
  def change
    change_column :statistics, :score, :decimal,:precision => 4, :scale => 2
  end
end
