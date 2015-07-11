class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :full_name
      t.string :password
      t.string :user_type
      t.integer :user_score
      t.string :access_token
      t.string :user_bio
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps null: false
    end
  end
end
