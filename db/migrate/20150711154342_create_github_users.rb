class CreateGithubUsers < ActiveRecord::Migration
  def change
    create_table :github_users do |t|
      t.references :user, index: true, foreign_key: true
      t.string :login
      t.string :gh_id
      t.string :avatar_url
      t.string :gravatar_id
      t.string :url
      t.string :html_url
      t.string :followers_url
      t.string :gists_url
      t.string :subscriptions_url
      t.string :organizations_url
      t.string :repos_url
      t.string :events_url
      t.string :received_events_url
      t.string :type
      t.string :site_admin
      t.string :name
      t.string :company
      t.string :blog
      t.string :location
      t.string :email
      t.boolean :hireable
      t.integer :public_repos
      t.integer :public_gists
      t.integer :followers
      t.integer :following
      t.date :gh_created
      t.date :gh_updated
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps null: false
    end
  end
end
