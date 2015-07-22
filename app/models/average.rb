class Average < ActiveRecord::Base

  # Update GitHub averages on the averages table using all GitHub users data
  def self.update_github_averages
    @github_users = GithubUser.all
    @average = Average.first
    @gh_users_stars = Statistic.where(score_type: "gh_stars")
    @gh_users_forks = Statistic.where(score_type: "gh_forks")
    @average.update_attribute(:gh_users_followers, @github_users.average(:followers))
    @average.update_attribute(:gh_users_following, @github_users.average(:following))
    binding.pry
    @average.update_attribute(:gh_users_stars, @gh_users_stars.average(:score))
    @average.update_attribute(:gh_users_forks, @gh_users_forks.average(:score))
  end

  # Update StackOverflow averages on the averages table using all StackOverflow users data
  def self.update_stackoverflow_averages
    @stack_users = StackUser.all
    @average = Average.first
    @average.update_attribute(:so_users_answers, @stack_users.average(:answer_count))
    @average.update_attribute(:so_users_questions, @stack_users.average(:question_count))
    @average.update_attribute(:so_users_down_votes, @stack_users.average(:down_vote_count))
    @average.update_attribute(:so_users_up_votes, @stack_users.average(:up_vote_count))
    @average.update_attribute(:so_users_reputation, @stack_users.average(:reputation))
    @average.update_attribute(:so_users_gold_badges, @stack_users.average(:bc_gold))
    @average.update_attribute(:so_users_silver_badges, @stack_users.average(:bc_silver))
    @average.update_attribute(:so_users_bronze_badges, @stack_users.average(:bc_bronze))
  end

  # Update Twitter averages on the averages table using all Twitter users data
  def self.update_twitter_averages
    @twitter_users = TwitterUser.all
    @average = Average.first
    @average.update_attribute(:tw_users_followers, @twitter_users.average(:followers_count))
    @average.update_attribute(:tw_users_friends, @twitter_users.average(:friends_count))
    @average.update_attribute(:tw_users_favourites, @twitter_users.average(:favourites_count))
    @average.update_attribute(:tw_users_listed, @twitter_users.average(:listed_count))
    @average.update_attribute(:tw_users_statuses, @twitter_users.average(:statuses_count))
  end

  # # Update User averages on the averages table using all Users data
  def self.update_user_averages
    @users = User.all
    @average = Average.first
    @average.update_attribute(:users_total_score, @users.average(:user_score))
  end 

end