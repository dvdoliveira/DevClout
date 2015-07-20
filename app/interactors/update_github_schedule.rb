class UpdateGithubSchedule
  include Interactor
  before do
    GH_ENDPOINT_USERS = "https://api.github.com/users/"
    gh_client_id = Rails.application.secrets.omniauth_github_key
    gh_key = Rails.application.secrets.omniauth_github_secret
  end

  def call
    @gh_user_response = HTTParty.get("#{GH_ENDPOINT_USERS}#{context.user.login}?client_id=#{@gh_client_id}&key=#{@gh_key}")
    @gh_user_repo_response = HTTParty.get("#{GH_ENDPOINT_USERS}#{context.user.login}/repos?client_id=#{@gh_client_id}&key=#{@gh_key}")
    # @so_user_response = HTTParty.get("#{SE_ENDPOINT}#{so_user_id}?client_id=#{so_client_id}&key=#{so_key}&site=stackoverflow&filter=!9YdnSBVWs")
    check_update_field(@gh_user_response,context.user)
    update_user_repos(context.user)
  end

  def check_update_field(user_response,user_in_db)
    if user_response["updated_at"] == user_in_db["updated_at"]
      return false
    else
      update_users_table(user_response,user_in_db)
    end
  end

  def update_users_table(response,user)
    @user = GithubUser.find_by(id: user["id"])
    @user.update_attributes(followers: response["followers"],following: response["following"],public_repos: response["public_repos"],gh_updated: response["updated_at"],hireable: response["hireable"])
  end

  def update_user_repos(githubuser)
    user_repos = GithubRepo.where(github_user_id: githubuser.gh_id).destroy_all
    @gh_user_repo_response.each do |repo|
        @githubrepo = GithubRepo.create(
          github_user_id: githubuser.gh_id,
          gh_owner_name: repo["owner"]["login"],
          owner_id: repo["owner"]["id"],
          name: repo["name"],
          full_name:repo["full_name"],
          gh_private: repo["private"],
          html_url: repo["html_url"],
          description: repo["description"],
          fork: repo["fork"],
          url:repo["url"],
          gh_created_at: repo["created_at"],
          gh_updated_at: repo["updated_at"],
          gh_pushed_at: repo["pushed_at"],
          git_url: repo["git_url"],
          clone_url: repo["clone_url"],
          ssh_url: repo["ssh_url"],
          svn_url: repo["svn_url"],
          homepage: repo["homepage"],
          size: repo["size"],
          stars_count: repo["stargazers_count"],
          watchers_count: repo["watchers_count"],
          forks_count: repo["forks_count"],
          language: repo["language"],
          has_issues: repo["has_issues"],
          has_downloads: repo["has_downloads"],
          mirror_url: repo["mirror_url"],
          open_issues_count: repo["open_issues_count"],
          watchers: repo["watchers"],
          default_branch: repo["default_branch"],
          repo_id: repo["id"]
        )
    end
  end
end
