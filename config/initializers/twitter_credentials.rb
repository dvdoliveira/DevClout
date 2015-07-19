require 'twitter'

$twitter = Twitter::REST::Client.new do |config|
  config.consumer_key = Rails.application.secrets.omniauth_twitter_key
  config.consumer_secret = Rails.application.secrets.omniauth_twitter_secret
  config.access_token = Rails.application.secrets.twitter_access_token
  config.access_token_secret = Rails.application.secrets.twitter_access_token_secret
end