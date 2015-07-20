class CreateStackUser
  include Interactor

  def call
    if (context.response["items"][0]["last_modified_date"])
      @new_modified_time =  Time.at(context.response["items"][0]["last_modified_date"]).to_datetime
    else
      @new_modified_time =  Time.at(context.response["items"][0]["creation_date"]).to_datetime
    end
    @stack_user = StackUser.create(
      user_id: context.session_user_id,
      access_token: context.auth[:credentials].token,
      so_user_id: context.auth[:extra][:raw_info].user_id,
      account_id: context.response["items"][0]["account_id"],
      display_name: context.response["items"][0]["display_name"],
      about_me: context.response["items"][0]["about_me"],
      age: context.response["items"][0]["age"],
      location: context.response["items"][0]["location"],
      link: context.response["items"][0]["link"],
      profile_image: context.response["items"][0]["profile_image"],
      is_employee: context.response["items"][0]["is_employee"],
      user_type: context.response["items"][0]["user_type"],
      website_url: context.response["items"][0]["website_url"],
      reputation: context.response["items"][0]["reputation"],
      reputation_change_day: context.response["items"][0]["reputation_change_day"],
      reputation_change_week: context.response["items"][0]["reputation_change_week"],
      reputation_change_month: context.response["items"][0]["reputation_change_month"],
      reputation_change_quarter: context.response["items"][0]["reputation_change_quarter"],
      reputation_change_year: context.response["items"][0]["reputation_change_year"],
      bc_bronze: context.response["items"][0]["badge_counts"]["bronze"],
      bc_silver: context.response["items"][0]["badge_counts"]["silver"],
      bc_gold: context.response["items"][0]["badge_counts"]["gold"],
      answer_count: context.response["items"][0]["answer_count"],
      down_vote_count: context.response["items"][0]["down_vote_count"],
      question_count: context.response["items"][0]["question_count"],
      up_vote_count: context.response["items"][0]["up_vote_count"],
      view_count: context.response["items"][0]["view_count"],
      creation_date: Time.at(context.response["items"][0]["creation_date"]).to_datetime,
      last_access_date: Time.at(context.response["items"][0]["last_access_date"]).to_datetime,
      last_modified_date: @new_modified_time
      )

      @user = User.find_by(id: context.session_user_id)
      stack_score = UserStackScore.call({user: @user,total_score: @user.user_score})
  end

end
