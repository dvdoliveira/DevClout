class UsersController < ApplicationController
  before_filter :authenticate_user!


  def index
  end

  def show
  end

  def profile
    @user = current_user
    respond_to do |format|
      format.html
      format.json {render json: {:user => @user, :github_user => @user.github_user, :stack_user => @user.stack_user, :avg_user_score => @user.avg_user_score, :github_repos => @user.github_user.github_repos, :average => Average.all, :statistics => @user.statistics}}
    end
  end

  def update
    respond_to do |format|
      @user = User.find(params[:id])
      if @user.update(user_params)
        format.html { redirect_to profile_path, notice: 'Thing was successfully updated.' }
        format.json { render json: @user }
      else
        format.json { render json: @thing.errors.full_messages, status: :unprocessable_entity }
      end
    end
    # respond_to do |format|
    #   @user = User.find(params[:id])
    #   if @user.update(user_params)
    #     format.html { redirect_to profile_path, notice: 'User was successfully updated.' }
    #   else
    #     format.html { render action: "edit" }
    #   end
    # end
  end

  def logout
    session.clear
    redirect_to root_path
  end

  private

  def user_params
    params[:user].permit(
      :users,
      :email,
      :full_name,
      :password,
      :user_type,
      :user_score,
      :access_token,
      :user_bio,
      :created_at,
      :updated_at,
      :profile_image_url,
      :user_name,
      :blog,
      :user_level
    )
  end

end
