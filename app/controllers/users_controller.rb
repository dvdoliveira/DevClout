class UsersController < ApplicationController
  before_filter :authenticate_user!

  def index
  end

  def show
    @user = User.find_by(id: params[:id])
    @users = User.order(user_score: :desc)
    @average_user_score = (@users.sum(:user_score) / @users.length)
    @repos = GithubRepo.where(github_user_id: @user.github_user.gh_id)
    @newest_stats = @user.statistics.order(created_at: :desc).limit(20)
    @leaderboard_pos = @users.map(&:id).index(@user.id) + 1
    respond_to do |format|
      format.html
      format.json {render json: {
        :user => @user, 
        :github_user => @user.github_user, 
        :stack_user => @user.stack_user, 
        :avg_user_score => @average_user_score, 
        :github_repos => @repos, 
        :average => Average.first, 
        :newest_stats => @newest_stats,
        :current_rank => @leaderboard_pos
      }}
    end
  end

  def profile
    @user = current_user
    @users = User.order(user_score: :desc)
    @average_user_score = (@users.sum(:user_score) / @users.length)
    @repos = GithubRepo.where(github_user_id: @user.github_user.gh_id)
    @newest_stats = @user.statistics.order(created_at: :desc).limit(20)
    @leaderboard_pos = @users.map(&:id).index(@user.id) + 1
    respond_to do |format|
      format.html
      format.json {render json: {
        user: @user, 
        github_user: @user.github_user, 
        stack_user: @user.stack_user, 
        avg_user_score: @average_user_score, 
        github_repos: @repos, 
        average: Average.first, 
        newest_stats: @newest_stats,
        current_rank: @leaderboard_pos
      }}
    end
  end

  def compare
    @current_user = current_user
    @user = User.find_by(id: params[:id])
    @users = User.order(user_score: :desc)
    @repos = GithubRepo.where(github_user_id: @user.github_user.gh_id)
    @newest_stats = @user.statistics.order(created_at: :desc).limit(20)
    @leaderboard_pos = @users.map(&:id).index(@user.id) + 1
    respond_to do |format|
      format.html
      format.json { render json: {
        user: @user,
        github_user: @user.github_user,
        stack_user: @user.stack_user,
        github_repos: @repos,
        average: Average.first,
        newest_stats: @newest_stats,
        current_rank: @leaderboard_pos
        }}
      end
  end

  def update
    respond_to do |format|
      @user = current_user
      if @user.update(user_params)
        format.html { redirect_to profile_path, notice: 'Thing was successfully updated.' }
        format.json { render json: @user }
      else
        format.json { render json: @thing.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  def logout
    session.clear
    redirect_to root_path
  end

  def followers
    @user = User.find_by(id: params[:id])
    @users = @user.followers.uniq
    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end

  def following
    @user = User.find_by(id: params[:id])
    @users = @user.followed_users.uniq
    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end

  def follow
    current_user.follow!(User.find(params[:tw_id]))
  end

  def unfollow
    current_user.unfollow!(User.find(params[:tw_id]))
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
