class SessionsController < ApplicationController

  def new
    redirect_to '/auth/github'
  end

  def create
    auth = request.env["omniauth.auth"]
    session_code = request.env["omniauth.auth"]['code']
    # result = Octokit.exchange_code_for_token(session_code, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET'])
    session[:access_token] = auth.credentials[:token]
    # binding.pry
    # client = Octokit::Client.new :access_token => session[:access_token]
    # data = client.user
    # user = User.find_by(user_name: data.login)

    # unless user then
      @user = User.create(
        email: auth.info[:email],
        full_name: auth.info[:name],
        user_type: "Developer",
        access_token: session[:access_token],
        user_bio:  auth.extra[:raw_info][:bio],
        created_at: auth.extra[:raw_info][:created_at],
        updated_at: auth.extra[:raw_info][:updated_at],
        Profile_Image_Url: auth.extra[:raw_info][:avatar_url],
        user_name:  auth.info[:nickname],
        blog: auth.extra[:raw_info][:blog]
      )
      # binding.binding.pry
      @user.save
      # githubUser_create(user.id,auth)

    session[:user_id] = @user.id
    # @user = User.find_or_create_from_auth_hash(auth_hash)
    # self.current_user = @user
    redirect_to about_path
  # end
end

# def githubUser_create(id,auth)
#   githubuser = GithubUser.create(
#     user_id: id,
#     login: auth.extra[:raw_info][:login],
#     gh_id: auth.extra[:raw_info][:id],
#     avatar_url: auth.extra[:raw_info][:avatar_url],
#     gravatar_id: auth.extra[:raw_info][:gravatar_id],
#     url: auth.extra[:raw_info][:url],
#     html_url: auth.extra[:raw_info][:html_url],
#     followers_url: auth.extra[:raw_info][:followers_url],
#     gists_url: auth.extra[:raw_info][:gists_url],
#     subscriptions_url: auth.extra[:raw_info][:subscriptions_url],
#     organizations_url: auth.extra[:raw_info][:organizations_url],
#     repos_url: auth.extra[:raw_info][:repos_url],
#     events_url: auth.extra[:raw_info][:events_url],
#     received_events_url: auth.extra[:raw_info][:received_events_url],
#     type: auth.extra[:raw_info][:type],
#     site_admin: auth.extra[:raw_info][:site_admin],
#     name: auth.extra[:raw_info][:name],
#     company: auth.extra[:raw_info][:company],
#     blog: auth.extra[:raw_info][:blog],
#     location: auth.extra[:raw_info][:location],
#     email: auth.extra[:raw_info][:email],
#     hireable: auth.extra[:raw_info][:hireable],
#     public_repos: auth.extra[:raw_info][:public_repos],
#     public_gists: auth.extra[:raw_info][:public_gists],
#     followers: auth.extra[:raw_info][:followers],
#     following: auth.extra[:raw_info][:following],
#     gh_created: auth.extra[:raw_info][:created_at],
#     gh_updated: auth.extra[:raw_info][:updated_at],
#   )
# end


def  failure
  redirect_to root_path, :alert => "Authentication error: #{params[:message].humanize}"
end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

end
