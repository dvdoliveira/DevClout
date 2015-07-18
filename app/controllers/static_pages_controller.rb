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
    @users = User.order(user_score: :desc)
  end
end
