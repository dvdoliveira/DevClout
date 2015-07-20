class CreateGithubUser
  include Interactor

  def call

    @user = User.create(
      email: context.auth.info[:email],
      full_name: context.auth.info[:name],
      user_type: "Developer",
      access_token: context.auth.credentials[:token],
      user_bio:  context.auth.extra[:raw_info][:bio],
      profile_image_url: context.auth.extra[:raw_info][:avatar_url],
      user_name:  context.auth.info[:nickname],
      blog: context.auth.extra[:raw_info][:blog]
    )

    @githubuser = GithubUser.create(
      user_id: @user.id,
      login: context.auth.extra[:raw_info][:login],
      gh_id: context.auth.extra[:raw_info][:id],
      avatar_url: context.auth.extra[:raw_info][:avatar_url],
      gravatar_id: context.auth.extra[:raw_info][:gravatar_id],
      url: context.auth.extra[:raw_info][:url],
      html_url: context.auth.extra[:raw_info][:html_url],
      followers_url: context.auth.extra[:raw_info][:followers_url],
      gists_url: context.auth.extra[:raw_info][:gists_url],
      subscriptions_url: context.auth.extra[:raw_info][:subscriptions_url],
      organizations_url: context.auth.extra[:raw_info][:organizations_url],
      repos_url: context.auth.extra[:raw_info][:repos_url],
      events_url: context.auth.extra[:raw_info][:events_url],
      received_events_url: context.auth.extra[:raw_info][:received_events_url],
      user_type: context.auth.extra[:raw_info][:type],
      site_admin: context.auth.extra[:raw_info][:site_admin],
      name: context.auth.extra[:raw_info][:name],
      company: context.auth.extra[:raw_info][:company],
      blog: context.auth.extra[:raw_info][:blog],
      location: context.auth.extra[:raw_info][:location],
      email: context.auth.extra[:raw_info][:email],
      hireable: context.auth.extra[:raw_info][:hireable],
      public_repos: context.auth.extra[:raw_info][:public_repos],
      public_gists: context.auth.extra[:raw_info][:public_gists],
      followers: context.auth.extra[:raw_info][:followers],
      following: context.auth.extra[:raw_info][:following],
      gh_created: context.auth.extra[:raw_info][:created_at],
      gh_updated: context.auth.extra[:raw_info][:updated_at]
    )

    context.repo_response.each do |repo|
    @githubrepo = GithubRepo.create(
      github_user_id: @githubuser.gh_id,
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
    user_score = UserGithubScore.call({user: @user})
    context.value = @user
  end
end
