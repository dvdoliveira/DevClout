class SessionsController < ApplicationController
  def new
    redirect_to '/auth/github'
  end

  def create
    @auth = request.env["omniauth.auth"]
    session_code = request.env["omniauth.auth"]['code']
    session[:access_token] = @auth.credentials[:token]
    gh_client_id = Rails.application.secrets.omniauth_github_key
    gh_key = Rails.application.secrets.omniauth_github_secret
    repo_response = GithubAuthentication.call({auth: @auth, gh_client_id: gh_client_id, gh_key: gh_key})
    @user = User.find_by(user_name: @auth.info[:nickname])

    unless @user then
      new_user = CreateNewUser.call({auth: @auth, repo_response: repo_response.value})
    end

    if @user
      session[:user_id] = @user.id
    else
      session[:user_id] = new_user.value.id
    end
    redirect_to profile_path
  end

  def failure
    if current_user
      redirect_to profile_path, :alert => "Authentication error: #{params[:message].humanize}"
    else
      redirect_to root_path, :alert => "Authentication error: #{params[:message].humanize}"
    end
  end

  protected

    def auth_hash
      request.env['omniauth.auth']
    end

end
