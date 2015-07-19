class StackoverflowAuthentication
  include Interactor

  before do
    SE_ENDPOINT = "https://api.stackexchange.com/2.2/users/"
    @gh_user_id = context.auth.extra[:raw_info][:login]
    @gh_client_id = context.gh_client_id
    @gh_key = context.gh_key
  end

  def call
  end

end
