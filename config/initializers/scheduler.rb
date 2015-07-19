#
# config/initializers/scheduler.rb

require 'rufus-scheduler'

# Let's use the rufus-scheduler singleton
#
s = Rufus::Scheduler.singleton


# Stupid recurrent task...
#
s.every '1m' do

  # Rails.logger.info "hello, it's #{Time.now}"
  get_users = User.all
  get_users.each do |user|
    user_score = UserGithubScore.call({user: user})
    stack_score = UserStackScore.call({user: user,total_score: user.user_score})
  end

end
