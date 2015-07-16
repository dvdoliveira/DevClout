class CreateAverages < ActiveRecord::Migration
  def change
    create_table :averages do |t|
      t.float :gh_users_stars, default: 0
      t.float :gh_users_followers, default: 0
      t.float :gh_users_forks, default: 0
      t.float :gh_users_following, default: 0
      t.float :gh_users_ff_ratio, default: 0
      t.float :so_users_answers, default: 0
      t.float :so_users_questions, default: 0
      t.float :so_users_down_votes, default: 0
      t.float :so_users_up_votes, default: 0
      t.float :so_users_reputation, default: 0
      t.float :so_users_gold_badges, default: 0
      t.float :so_users_silver_badges, default: 0
      t.float :so_users_bronze_badges, default: 0
      t.float :tw_users_followers, default: 0
      t.float :tw_users_friends, default: 0
      t.float :tw_users_favourites, default: 0
      t.float :tw_users_listed, default: 0
      t.float :tw_users_statuses, default: 0
      t.timestamps null: false
    end
  end
end
