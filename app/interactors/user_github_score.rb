class UserGithubScore
  include Interactor

  def call
    score_calc(context.user)
  end

  def total_stars_count(repo)
    if repo.stars_count
      @total_stars_count += repo.stars_count
    end
  end

  def total_forks_count(repo)
    if repo.forks_count
      @total_forks_count += repo.forks_count
    end
  end

  def stars_score
    if (@total_stars_count >= 50)
      @total_score += 20
    elsif (@total_stars_count >=10 && @total_stars_count < 49)
      @total_score += 14
    elsif (@total_stars_count >=5 && @total_stars_count < 10)
      @total_score += 8
    elsif (@total_stars_count >=1 && @total_stars_count < 5)
      @total_score += 4
    else
      @total_score += 1
    end
  end

  def followers_score
    if (@total_followers_count>=20)
      @total_score += 10
    elsif (@total_followers_count>=5 && @total_followers_count <20)
      @total_score += 7
    elsif (@total_followers_count>=3 && @total_followers_count <5)
      @total_score += 4
    elsif (@total_followers_count>=1 && @total_followers_count <3)
      @total_score += 2
    else
      @total_score += 1
    end
  end

  def forks_score
    if (@total_forks_count>=50)
      @total_score += 20
    elsif (@total_forks_count>=10 && @total_forks_count <50)
      @total_score += 14
    elsif (@total_forks_count>=5 && @total_forks_count <10)
      @total_score += 8
    elsif (@total_forks_count>=1 && @total_forks_count <5)
      @total_score += 4
    else
      @total_score += 2
    end
  end

  def friend_ratio_final_score
    if (@friend_ratio_score>=5)
      @total_score += 10
    elsif (@friend_ratio_score>=3 && @friend_ratio_score < 5)
      @total_score += 7
    elsif (@friend_ratio_score>=2 && @friend_ratio_score < 3)
      @total_score += 4
    elsif (@friend_ratio_score>=1 && @friend_ratio_score < 2)
      @total_score += 2
    else
      @total_score += 1
    end
  end

  def calculate_score
    stars_score
    followers_score
    forks_score
    friend_ratio_final_score
  end

  def friend_ratio_for_display(following,followers)
    if following == 0
      @friend_ratio_score_display = followers/1
    else
      @friend_ratio_score_display = followers/following.to_f
    end
  end

  def friend_ratio_score_calculation(following,followers)
    if following != 0 && followers > 0
      @friend_ratio_score = (followers/following)
    else
      if followers > 50
        @friend_ratio_score = 5
      elsif followers >= 40 && followers<50
        @friend_ratio_score = 4
      elsif followers >=20 && followers<40
        @friend_ratio_score = 3
      elsif followers >=10 && followers<20
        @friend_ratio_score = 2
      elsif followers >0 && followers<10
        @friend_ratio_score = 1
      else
        @friend_ratio_score = 0
      end
    end
  end

  def score_calc(user)
    @total_stars_count = 0
    @total_forks_count = 0
    @total_score = 0
    find_user_follower = GithubUser.find_by(user_id: user.id)
    @user = User.find_by(id: user.id)
    @githubUser = GithubUser.find_by(user_id: user.id)
    @total_followers_count = find_user_follower.followers
    @following_count = find_user_follower.following
    friend_ratio_for_display(@following_count,@total_followers_count)
    friend_ratio_score_calculation(@following_count,@total_followers_count)
    get_value_from_repos(@githubUser)
    calculate_score
    @user.update_attribute(:user_score, @total_score)
     update_stats_table(@user)
     update_user_level(@user)
     update_user_rank
  end

  def update_user_rank
    user_ranked_data = User.order(user_score: :desc)
    user_ranked_data.each_with_index do |user,index|
      Statistic.create(
        user_id: user.id,
        score: index+1,
        score_type: "leaderboard_rank"
        )
    end

  end

def update_user_level(user)
  case user.user_score
  when 1..8
    @user.update_attribute(:user_level,"Apprentice")
  when 8..20
    @user.update_attribute(:user_level,"Enthusiast")
  when 20..44
    @user.update_attribute(:user_level,"Creator")
  when 44..77
    @user.update_attribute(:user_level,"Collaborator")
  else
    @user.update_attribute(:user_level,"Guru")
  end
end

  def get_value_from_repos(user)
    @repos_for_user = GithubRepo.where(github_user_id: user.gh_id)
    @repos_for_user.each do |repo|
      total_stars_count(repo)
      total_forks_count(repo)
    end
  end


  def update_stats_table(user)

    Statistic.create(
      user_id: user.id,
      score: @repos_for_user.count,
      score_type: "gh_repo_count"
    )

    Statistic.create(
      user_id: user.id,
      score: @total_stars_count.to_f,
      score_type: "gh_stars"
    )
    Statistic.create(
      user_id: user.id,
      score: @total_forks_count.to_f,
      score_type: "gh_forks"
    )
    Statistic.create(
      user_id: user.id,
      score: @total_followers_count.to_f,
      score_type: "gh_followers"
    )
    Statistic.create(
      user_id: user.id,
      score: @following_count.to_f,
      score_type: "gh_following"
    )

    Statistic.create(
      user_id: user.id,
      score: @friend_ratio_score_display,
      score_type: "gh_friends_following_ratio"
    )

    Statistic.create(
    user_id: user.id,
    score: @total_score.to_f,
    score_type: "gh_total_score"
    )
  end

end
