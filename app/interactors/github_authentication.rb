class GithubAuthentication
  include Interactor

  before do
    GH_ENDPOINT = "https://api.github.com/users/"
    @gh_user_id = context.auth.extra[:raw_info][:login]
    @gh_client_id = context.gh_client_id
    @gh_key = context.gh_key
  end

  def call
    context.value = HTTParty.get("#{GH_ENDPOINT}#{@gh_user_id}/repos?client_id=#{@gh_client_id}&key=#{@gh_key}")
  end
end
