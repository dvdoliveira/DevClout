class ChangeRelationshipsIndex < ActiveRecord::Migration
  def change
    remove_index :relationships, name: :index_relationships_on_follower_id_and_followed_id
    add_index :relationships, [:follower_id, :followed_id]
  end
end
