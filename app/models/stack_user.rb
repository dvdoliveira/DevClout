class StackUser < ActiveRecord::Base
  belongs_to :user
  after_commit :update_users_stackoverflow_averages

  protected 

  def update_users_stackoverflow_averages
    Average.update_stackoverflow_averages
  end
end
