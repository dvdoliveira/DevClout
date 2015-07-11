class CreateStatistics < ActiveRecord::Migration
  def change
    create_table :statistics do |t|
      t.references :user, index: true, foreign_key: true
      t.integer :score
      t.string :score_type
      t.datetime :created_at

      t.timestamps null: false
    end
  end
end
