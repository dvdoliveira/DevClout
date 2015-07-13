Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :github, 
    Rails.application.secrets.omniauth_github_key, 
    Rails.application.secrets.omniauth_github_secret, 
    scope: "user,repo"
  provider :stackexchange, 
    Rails.application.secrets.omniauth_stackexchange_client_id, 
    Rails.application.secrets.omniauth_stackexchange_client_secret, 
    public_key: Rails.application.secrets.omniauth_stackexchange_public_key, 
    site: 'stackoverflow'
end
