class UpdateUserProfile
  include Interactor

  def call
    @user = context.user
    @user_so_data = StackUser.find_by(user_id: context.user.id)
    @user_twitter_data = TwitterUser.find_by(user_id: context.user.id)
    update_display_fields
  end

  def update_display_fields
    if @user.full_name.blank?
      check_stackoverflow_name_data
    end

    if @user.email.blank?
      @user.update_attribute(:user_email_display,nil)
    end

    if @user.user_bio.blank?
      check_stackoverflow_bio_data
    end

    if @user.blog.blank?
      check_twitter_blog_data
    end

  end

  def check_stackoverflow_name_data
    if @user_so_data.display_name.blank?
      check_twitter_name_data
    else
      @user.update_attribute(:user_full_name_display, @user_so_data.display_name)
    end
  end

  def check_twitter_name_data
    if @user_twitter_data.name.blank?
      @user.update_attribute(:user_full_name_display, @user.user_name)
    else
      @user.update_attribute(:user_full_name_display, @user_twitter_data.user_name)
    end
  end

  def check_stackoverflow_bio_data
    if @user_so_data.about_me.blank?
      check_twitter_bio_data
    else
      @user.update_attribute(:user_bio_display, @user_so_data.about_me)
    end
  end

  def check_twitter_bio_data
    if @user_twitter_data.description.blank?
      @user.update_attribute(:user_bio_display, nil)
    else
      @user.update_attribute(:user_bio_display, @user_twitter_data.description)
    end
  end

  def check_twitter_blog_data
    if @user_twitter_data.url.blank?
      @user.update_attribute(:user_blog_display, nil)
    else
      @user.update_attribute(:user_blog_display, @user_twitter_data.url)
    end
  end
end
