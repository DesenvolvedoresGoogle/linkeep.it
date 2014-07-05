class Link < ActiveRecord::Base

  belongs_to :user

  validates :name, :url, presence: true
  validates :url, format: {
    with: /\A((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/,
    message: 'invalid link format'
  }

end
