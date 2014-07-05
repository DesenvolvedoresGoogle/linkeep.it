class Link < ActiveRecord::Base

  belongs_to :user

  acts_as_taggable

  validates :name, :url, presence: true
  validates :url, format: {
    with: /\A((https?:\/\/)?[\w-]+(\.[\w-]+)?+\.?(:\d+)?(\/.*)?)/,
    message: 'invalid link format'
  }

end
