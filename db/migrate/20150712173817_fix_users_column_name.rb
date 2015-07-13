class FixUsersColumnName < ActiveRecord::Migration
  def change
    rename_column :users, :Profile_Image_Url, :profile_image_url
  end
end
