module V1
  class Links < Grape::API
    version 'v1'
    format :json

    resource :links do
      desc 'List of links'
      get do
        @current_user.links.order created_at: :desc
      end
    end
  end
end
