class CalculateUserScore
  include Interactor
  @total_stars_count = 0
  @total_forks_count = 0
  @total_score = 0

  def call
    score_calc
  end

  def total_stars_count(repo)
    @total_stars_count += repo.stars_count
  end


  def total_forks_count(repo)
    @total_forks_count += user.forks_count
  end

  def stars_score
    if (@total_stars_count>=50)
      @total_score += 20
    elsif (@total_stars_count>=10 && <49)
      @total_score += 14
    elsif (@total_stars_count>=5 && <10)
      @total_score += 8
    elsif (@total_stars_count>=1 && <5)
      @total_score += 4
    else
      @total_score += 1
    end
  end

  def followers_score
    if (@total_followers_count>=20)
      @total_score += 10
    elsif (@total_followers_count>=5 && <20)
      @total_score += 7
    elsif (@total_followers_count>=3 && <5)
      @total_score += 4
    elsif (@total_followers_count>=1 && <3)
      @total_score += 2
    else
      @total_score += 1
    end
  end

  def forks_score
    if (@total_forks_count>=50)
      @total_score += 20
    elsif (@total_forks_count>=10 && <50)
      @total_score += 14
    elsif (@total_forks_count>=5 && <10)
      @total_score += 8
    elsif (@total_forks_count>=1 && <5)
      @total_score += 4
    else
      @total_score += 2
    end
  end

  def friend_ratio_final_score
    if (@friend_ratio_score>=5)
      @total_score += 10
    elsif (@friend_ratio_score>=3 && <5)
      @total_score += 7
    elsif (@friend_ratio_score>=2 && <3)
      @total_score += 4
    elsif (@friend_ratio_score>=1 && <2)
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

  def score_calc
    @total_followers_count = GithubUser.followers
    @following_count = GithubUser.following
      unless @following_count = 0
        @friend_ratio_score = (total_followers_count/following_count)
      else
        @friend_ratio_score = 10
      end

    repos_for_user = GithubRepo.find_by(github_user_id: user.id)
    repos_for_user.each do |repo|
      total_stars_count(repo)
      total_forks_count(repo)
    end

    # Statistic.create(
    #   user_id: user.id,
    #   score: @total_stars_count,
    #   score_type: "gh_stars_count"
    # )
    # #followers
    # #following
    # #friend/follower ratio
    # #forks_count
    # calculate_score
    #
    # Statistic.create(
    # user_id: user.id,
    # score: @total_score,
    # score_type: "total_score"
    # )

  end


end
