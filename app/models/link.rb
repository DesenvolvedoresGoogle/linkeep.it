class Link < ActiveRecord::Base

  belongs_to :user

  validates :name, :url, presence: true
  validates :url, format: {
    with: /\A((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/,
    message: 'invalid link format'
  }

  validate :uniqueness_per_user

  private
  def uniqueness_per_user
    if user.links.where(name: name).exists?
      errors.add :name, 'must be unique'
    end

    if user.links.where(url: url).exists?
      errors.add :url, 'must be unique'
    end
  end

end
