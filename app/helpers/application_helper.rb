module ApplicationHelper

  def url_with_protocol(url)
    unless url =~ /\Ahttp.*/
      url = "http://#{url}"
    end
    url
  end
end
