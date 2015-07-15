class AddSecretColumnToTwitterUsers < ActiveRecord::Migration
  def change
    add_column :twitter_users, :secret, :string
  end
end
