class ChangeStatisticsTableFieldToInteger < ActiveRecord::Migration
  def change
      change_column :statistics, :score, :float
  end
end
