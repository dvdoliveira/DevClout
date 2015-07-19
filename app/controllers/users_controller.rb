class UsersController < ApplicationController
  before_filter :authenticate_user!


  def index
  end

  def show
  end

  def profile
    @user = current_user
    @users = User.all
    @average_user_score = (@users.sum(:user_score) / @users.length)
    @repos = GithubRepo.where(github_user_id: @user.github_user.gh_id)
    respond_to do |format|
      format.html
      format.json {render json: {:user => @user, :github_user => @user.github_user, :stack_user => @user.stack_user, :avg_user_score => @average_user_score, :github_repos => @repos, :average => Average.first, :statistics => @user.statistics}}
    end
  end

  def logout
    session.clear
    redirect_to root_path
  end

end
