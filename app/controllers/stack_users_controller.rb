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

    # Check if stack_user already exist
    @stack_user = StackUser.find_by(so_user_id: @auth[:extra][:raw_info].user_id)
    unless @stack_user then
      # Do another HTTP API request to retrieve additional user data
      @response = HTTParty.get("#{SE_ENDPOINT}#{so_user_id}?client_id=#{so_client_id}&key=#{so_key}&site=stackoverflow&filter=!9YdnSBVWs")
      new_stack_user = CreateStackUser.call({auth: @auth, response: @response, session_user_id: session[:user_id]})
    end
    redirect_to profile_path, notice: "You are now connected with StackOverflow."
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
