# #
# # config/initializers/scheduler.rb
#
require 'rufus-scheduler'
#
# # # Let's use the rufus-scheduler singleton

s = Rufus::Scheduler.singleton

s.every '1440m' do
  GithubUser.find_each do |user|
    response = UpdateGithubSchedule.call({user: user})
    user_score = UserGithubScore.call({user: user})

    gh_user_account = User.find_by(id: user.id)
    user_stack_account = StackUser.find_by(user_id: user.id)
    if user_stack_account
      response = UpdateStackoverflowSchedule.call({user: user_stack_account})
      stack_score = UserStackScore.call({user: user,total_score: gh_user_account.user_score})
    end
  end

  s.every '1440m' do
   User.find_each do |user|
     update_display_fields = UpdateUserProfile.call({user: user})
   end
  end

  

end
