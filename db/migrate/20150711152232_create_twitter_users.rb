class CreateTwitterUsers < ActiveRecord::Migration
  def change
    create_table :twitter_users do |t|
      t.references :user, index: true, foreign_key: true
      t.string :email
      t.string :full_name
      t.string :password
      t.string :user_type
      t.integer :user_score
      t.string :user_name
      t.string :access_token
      t.text :bio
      t.string :blog
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps null: false
    end
  end
end
