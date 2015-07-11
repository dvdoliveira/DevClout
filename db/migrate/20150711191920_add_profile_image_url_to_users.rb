class AddProfileImageUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :Profile_Image_Url, :string
  end
end
