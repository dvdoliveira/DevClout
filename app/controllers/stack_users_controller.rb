class StackUsersController < ApplicationController
  def new
    redirect_to '/auth/stackexchange'
  end

  def create
    @auth = request.env["omniauth.auth"]
    binding.pry
    # binding.pry
    # @stack_user = StackUser.create(
    #   user_id: session[:user_id],
    #   about_me: 
    #   accept_rate:
    #   account_id:
    #   age:
    #   answer_count:
    #   bc_bronze:
    #   bc_silver:
    #   bc_gold:
    #   creation_date:
    #   display_name:
    #   down_vote_count:
    #   is_employee:
    #   last_access_date:
    #   last_modified_date:
    #   link:
    #   location:
    #   profile_image:
    #   question_count:
    #   reputation:
    #   reputation_change_day:
    #   reputation_change_month:
    #   reputation_change_quarter:
    #   reputation_change_week:
    #   reputation_change_year:
    #   timed_penalty_date:
    #   up_vote_count:
    #   user_type:
    #   view_count:
    #   website_url:

    #   )
  end
end
