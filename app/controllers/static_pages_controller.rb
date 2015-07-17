class StaticPagesController < ApplicationController
  def home
  end

  def help
  end

  def about
  end

  def contact
  end

  def leaderboard
    @user = current_user
    respond_to do |format|
      format.html
      format.json {render json: {:user => @user, :github_user => @user.github_user, :stack_user => @user.stack_user, :avg_user_score => @user.avg_user_score}}
    end
  end
end
