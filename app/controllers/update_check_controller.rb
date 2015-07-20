class UpdateCheckController < ApplicationController

  def update_check
      GithubUser.find_each do |user|
        response = UpdateGithubSchedule.call({user: user})
        user_score = UserGithubScore.call({user: user})

        user_stack_account = StackUser.find_by(user_id: user.id)
        gh_user_account = User.find_by(id: user.id)
        if user_stack_account
          response = UpdateStackoverflowSchedule.call({user: user_stack_account})
          binding.pry
          stack_score = UserStackScore.call({user: user,total_score: gh_user_account.user_score})
        end

      end

  end

end
