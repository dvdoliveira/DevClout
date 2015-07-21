class CreateStackBadges < ActiveRecord::Migration
  def change
    create_table :stack_badges do |t|
      t.references :stack_user, index: true
      t.integer :so_user_id
      t.string :badge_type
      t.integer :award_count
      t.string :badge_rank
      t.integer :so_badge_id
      t.string :badge_link
      t.string :description
      t.string :badge_name

      t.timestamps null: false
    end
  end
end
