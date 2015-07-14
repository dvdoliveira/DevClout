class StackUsersController < ApplicationController
  SE_ENDPOINT = "https://api.stackexchange.com/2.2/users/"

  def new
    redirect_to '/auth/stackexchange'
  end

  def create
    @auth = request.env["omniauth.auth"]
    so_user_id = @auth[:extra][:raw_info].user_id
    so_client_id = Rails.application.secrets.omniauth_stackexchange_client_id
    so_key = Rails.application.secrets.omniauth_stackexchange_public_key

    # Do another HTTP API request to retrieve additional user data
    @response = HTTParty.get("#{SE_ENDPOINT}#{so_user_id}?client_id=#{so_client_id}&key=#{so_key}&site=stackoverflow&filter=!9YdnSBVWs")
    binding.pry
    @stack_user = StackUser.create(
      user_id: session[:user_id],
      access_token: @auth[:credentials].token,
      so_user_id: @auth[:extra][:raw_info].user_id,
      account_id: @response["items"][0]["account_id"],
      display_name: @response["items"][0]["display_name"],
      about_me: @response["items"][0]["about_me"],
      age: @response["items"][0]["age"],
      location: @response["items"][0]["location"], 
      link: @response["items"][0]["link"],
      profile_image: @response["items"][0]["profile_image"],
      is_employee: @response["items"][0]["is_employee"],
      user_type: @response["items"][0]["user_type"],
      website_url: @response["items"][0]["website_url"],
      reputation: @response["items"][0]["reputation"],
      reputation_change_day: @response["items"][0]["reputation_change_day"],
      reputation_change_week: @response["items"][0]["reputation_change_week"],
      reputation_change_month: @response["items"][0]["reputation_change_month"],
      reputation_change_quarter: @response["items"][0]["reputation_change_quarter"],
      reputation_change_year: @response["items"][0]["reputation_change_year"],
      bc_bronze: @response["items"][0]["badge_counts"]["bronze"],
      bc_silver: @response["items"][0]["badge_counts"]["silver"],
      bc_gold: @response["items"][0]["badge_counts"]["gold"],
      answer_count: @response["items"][0]["answer_count"],
      down_vote_count: @response["items"][0]["down_vote_count"],
      question_count: @response["items"][0]["question_count"],
      up_vote_count: @response["items"][0]["up_vote_count"],
      view_count: @response["items"][0]["view_count"],
      creation_date: Time.at(@response["items"][0]["creation_date"]).to_datetime,
      last_access_date: Time.at(@response["items"][0]["last_access_date"]).to_datetime,
      last_modified_date: Time.at(@response["items"][0]["last_modified_date"]).to_datetime,
    )
    binding.pry
    redirect_to profile_path
  end
end
