class ChangeTwitterProtectedField < ActiveRecord::Migration
  def change
    rename_column :twitter_users, :protected, :tw_protected
  end
end
