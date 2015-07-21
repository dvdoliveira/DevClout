class StackUser < ActiveRecord::Base
  belongs_to :user
  has_many :stack_badges
  after_commit :update_users_stackoverflow_averages
  # after_create :calculate_so_score

  protected

  def update_users_stackoverflow_averages
    Average.update_stackoverflow_averages
  end
end

# private
# # def calculate_so_score
# #   @user = self
# #   binding.pry
# #
# # end
