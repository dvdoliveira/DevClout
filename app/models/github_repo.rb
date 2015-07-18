class GithubRepo < ActiveRecord::Base
  belongs_to :user
  # after_save :calculate_gh_score

  # private
  # def calculate_gh_score
  #   @user = self
  #   # user_score = CalculateUserScore.call({user: @user})
  # end

end
