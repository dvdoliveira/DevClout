class AddAverageScoreFieldToAverages < ActiveRecord::Migration
  def change
    add_column :averages, :users_total_score, :float, default: 0
  end
end
