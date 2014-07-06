module V1
  class Links < Grape::API
    version 'v1'
    format :json

    resource :links do
      desc 'List of links'
      get do
        @current_user.links.order created_at: :desc
      end

      desc 'Create a link'
      params do
        requires :name, type: String, desc: 'Name'
        requires :url, type: String, desc: 'Url'
        requires :tags, type: String, desc: 'Tags'
      end
      post do
        Link.create!({
          name: params[:name],
          url: params[:url],
          tag_list: params[:tags],
          user_id: current_user.id
        })
      end
    end
  end
end
