module LinksHelper
  def links_filters
    [
      {
        title: 'all',
        url: links_url(params)
      },
      {
        title: 'only read',
        url: read_links_url(params)
      },
      {
        title: 'only unread',
        url: unread_links_url(params)
      },
    ]
  end
end
