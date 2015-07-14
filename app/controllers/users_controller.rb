class UsersController < ApplicationController
before_filter :authenticate_user!
  def index
  end

  def show
  end

  def profile
    @user = User.first
    respond_to do |format|
      format.html
      format.json {render json: {:user => @user}}
    end
  end

  def logout
    session.clear
    redirect_to root_path
  end

end
