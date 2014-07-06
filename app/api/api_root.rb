class ApiRoot < Grape::API
  prefix 'api'

  helpers do
   def current_user
     token = ApiKey.find_by access_token: params[:token]
     if token && !token.expired?
       @current_user = token.user
     else
       false
     end
   end
  end

  before do
    error!('401 Unauthorized', 401) unless current_user
  end

  mount V1::Root

end
