class StackUsersController < ApplicationController
  def new
    redirect_to '/auth/stackexchange'
  end
end
