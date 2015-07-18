class StackUser < ActiveRecord::Base
  belongs_to :user
  after_commit :update_users_stackoverflow_averages
  # after_create :calculate_so_score

  protected

  def update_users_stackoverflow_averages
    Average.update_stackoverflow_averages
  end
end

private
def calculate_so_score
  @user = self
  # if StackUser.find_by(user_id: @user.id)
    stack_score = StackUserScore.call({user: @user,total_score: @user.user_score})
  # end
end
