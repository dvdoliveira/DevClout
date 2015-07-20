class UpdateStackoverflowSchedule
  include Interactor

  before do
    SE_ENDPOINT = "https://api.stackexchange.com/2.2/users/"
    so_client_id = Rails.application.secrets.omniauth_stackexchange_client_id
    so_key = Rails.application.secrets.omniauth_stackexchange_public_key
  end

  def call
    @response = HTTParty.get("#{SE_ENDPOINT}#{context.user.so_user_id}?client_id=#{@so_client_id}&key=#{@so_key}&site=stackoverflow&filter=!9YdnSBVWs")
    update_user_data(context.user)
  end

  def update_user_data(user)
    user.update_attributes(answer_count: @response["items"][0]["answer_count"],
                            bc_bronze: @response["items"][0]["badge_counts"]["bronze"],bc_silver: @response["items"][0]["badge_counts"]["silver"],
                            bc_gold: @response["items"][0]["badge_counts"]["gold"],down_vote_count: @response["items"][0]["down_vote_count"],
                            profile_image: @response["items"][0]["profile_image"],
                            question_count: @response ["items"][0]["question_count"],reputation: @response ["items"][0]["reputation"],
                            reputation_change_day: @response["items"][0]["reputation_change_day"], reputation_change_month: @response["items"][0]["reputation_change_month"],
                            reputation_change_quarter: @response["items"][0]["reputation_change_quarter"],reputation_change_year: @response["items"][0]["reputation_change_year"],
                            reputation_change_week: @response["items"][0]["reputation_change_week"],reputation_change_year: @response["items"][0]["reputation_change_year"],
                            up_vote_count: @response["items"][0]["up_vote_count"],view_count: @response["items"][0]["view_count"]
                          )
  end

end
