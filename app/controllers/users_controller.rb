class UsersController < ApplicationController
before_filter :authenticate_user!
  def index
  end

  def show
  end

  def profile
  end

  def logout
    session.clear
    redirect_to root_path
  end

end
