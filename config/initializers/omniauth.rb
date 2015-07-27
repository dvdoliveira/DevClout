include ApplicationHelper

SETUP_PROC = lambda do |env|
  req = Rack::Request.new(env)
  # Add parameter to oauth URL to disable token expiration
  env['omniauth.strategy'].options[:scope] = 'no_expiry'
end


Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :github, 
    Rails.application.secrets.omniauth_github_key, 
    Rails.application.secrets.omniauth_github_secret, 
    scope: "user,public_repo"
  provider :stackexchange, 
    Rails.application.secrets.omniauth_stackexchange_client_id, 
    Rails.application.secrets.omniauth_stackexchange_client_secret, 
    public_key: Rails.application.secrets.omniauth_stackexchange_public_key, 
    site: 'stackoverflow', 
    setup: SETUP_PROC
  provider :twitter, 
    Rails.application.secrets.omniauth_twitter_key, 
    Rails.application.secrets.omniauth_twitter_secret
end

OmniAuth.config.on_failure = Proc.new { |env|
  OmniAuth::FailureEndpoint.new(env).redirect_to_failure
}
