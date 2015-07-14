class StackUsersController < ApplicationController
  def new
    redirect_to '/auth/stackexchange'
  end

  def create
    @auth = request.env["omniauth.auth"]
    binding.pry
    @stack_user = StackUser.create(
      user_id: session[:user_id],
      access_token: @auth[:credentials].token,
      account_id: @auth[:extra][:raw_info].account_id,
      bc_bronze: @auth[:extra][:raw_info][:badge_counts].bronze,
      bc_silver: @auth[:extra][:raw_info][:badge_counts].silver,
      bc_gold: @auth[:extra][:raw_info][:badge_counts].gold,
      creation_date: @auth[:extra][:raw_info].creation_date,
      display_name: @auth[:extra][:raw_info].display_name,
      is_employee: @auth[:extra][:raw_info].is_employee,
      last_access_date: @auth[:extra][:raw_info].last_access_date,
      last_modified_date: @auth[:extra][:raw_info].last_modified_date,
      link: @auth[:extra][:raw_info].link,
      profile_image: @auth[:extra][:raw_info].profile_image,
      reputation: @auth[:extra][:raw_info].reputation,
      reputation_change_day: @auth[:extra][:raw_info].reputation_change_day,
      reputation_change_month: @auth[:extra][:raw_info].reputation_change_month,
      reputation_change_quarter: @auth[:extra][:raw_info].reputation_change_quarter,
      reputation_change_week: @auth[:extra][:raw_info].reputation_change_week,
      reputation_change_year: @auth[:extra][:raw_info].reputation_change_year,
      user_type: @auth[:extra][:raw_info].user_type,
      website_url: @auth[:info].urls
      # about_me: 
      # accept_rate:
      # age: 
      # answer_count:
      # down_vote_count:
      # location:  
      # question_count: 
      # timed_penalty_date: 
      # up_vote_count:
      # view_count:
      )
  end
end
