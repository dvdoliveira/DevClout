class StackUsersController < ApplicationController
  def new
    redirect_to '/auth/stackexchange'
  end

  def create
    @auth = request.env["omniauth.auth"]
  end
end
