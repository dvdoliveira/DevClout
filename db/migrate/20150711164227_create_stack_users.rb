class CreateStackUsers < ActiveRecord::Migration
  def change
    create_table :stack_users do |t|
      t.references :user, index: true, foreign_key: true
      t.text :about_me
      t.integer :accept_rate
      t.integer :account_id
      t.integer :age
      t.integer :answer_count
      t.integer :bc_bronze
      t.integer :bc_silver
      t.integer :bc_gold
      t.datetime :creation_date
      t.string :display_name
      t.integer :down_vote_count
      t.boolean :is_employee
      t.date :last_access_date
      t.date :last_modified_date
      t.string :link
      t.string :location
      t.string :profile_image
      t.integer :question_count
      t.integer :reputation
      t.integer :reputation_change_day
      t.integer :reputation_change_month
      t.integer :reputation_change_quarter
      t.integer :reputation_change_week
      t.integer :reputation_change_year
      t.date :timed_penalty_date
      t.integer :up_vote_count
      t.string :user_type
      t.integer :view_count
      t.string :website_url
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps null: false
    end
  end
end
