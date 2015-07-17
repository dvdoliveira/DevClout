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
      format.json {render json: {:user => @user, :github_user => @user.github_user, :stack_user => @user.stack_user, :avg_user_score => @user.avg_user_score, :github_repos => @user.github_user.github_repos}}
    end
  end

  def logout
    session.clear
    redirect_to root_path
  end

end
