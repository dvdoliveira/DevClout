Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :github, Rails.application.secrets.omniauth_github_key, Rails.application.secrets.omniauth_github_secret, scope: "user,repo"
end
