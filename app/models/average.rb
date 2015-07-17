class Average < ActiveRecord::Base

  @github_users = GithubUser.all;
  @stack_users = StackUser.all;
  @average = Average.find_by(id: 1)

  # Update GitHub averages on the averages table using all GitHub users data
  def self.update_github_averages
    @average.update_attribute(:gh_users_followers, @github_users.average(:followers))
    @average.update_attribute(:gh_users_following, @github_users.average(:following))
  end

  # Update StackOverflow averages on the averages table using all StackOverflow users data
  def self.update_stackoverflow_averages
    @average.update_attribute(:so_users_answers, @stack_users.average(:answer_count))
    @average.update_attribute(:so_users_questions, @stack_users.average(:question_count))
    @average.update_attribute(:so_users_down_votes, @stack_users.average(:down_vote_count))
    @average.update_attribute(:so_users_up_votes, @stack_users.average(:up_vote_count))
    @average.update_attribute(:so_users_reputation, @stack_users.average(:reputation))
    @average.update_attribute(:so_users_gold_badges, @stack_users.average(:bc_gold))
    @average.update_attribute(:so_users_silver_badges, @stack_users.average(:bc_silver))
    @average.update_attribute(:so_users_bronze_badges, @stack_users.average(:bc_bronze))
  end
  
end