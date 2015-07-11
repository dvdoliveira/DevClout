class CreateGithubRepos < ActiveRecord::Migration
  def change
    create_table :github_repos do |t|
      t.references :github_user, index: true, foreign_key: true
      t.string :gh_owner_name
      t.string :owner_id
      t.string :name
      t.string :full_name
      t.boolean :private
      t.string :html_url
      t.string :description
      t.boolean :fork
      t.string :url
      t.date :gh_created_at
      t.date :gh_updated_at
      t.date :gh_pushed_at
      t.string :git_url
      t.string :clone_url
      t.string :ssh_url
      t.string :svn_url
      t.string :homepage
      t.integer :size
      t.integer :stars_count
      t.integer :watchers_count
      t.integer :forks_count
      t.string :language
      t.boolean :has_issues
      t.boolean :has_downloads
      t.string :mirror_url
      t.integer :open_issues_count
      t.integer :watchers
      t.string :default_branch
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps null: false
    end
  end
end
