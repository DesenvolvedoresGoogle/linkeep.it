class ApiKey < ActiveRecord::Base

  belongs_to :user

  before_create :generate_access_token
  before_create :set_expiration

  def expired?
    DateTime.now >= self.expires_at
  end

  private
  def generate_access_token
    begin
      self.access_token = SecureRandom.hex
    end while self.class.exists?(access_token: access_token)
  end

  def set_expiration
    self.expires_at = 30.days.from_now
  end

end
