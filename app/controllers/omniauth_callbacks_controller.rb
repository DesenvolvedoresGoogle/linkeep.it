class OmniauthCallbacksController < ApplicationController

  skip_before_action :authenticate_user!

  def google_oauth2
    user = User.from_omniauth request.env['omniauth.auth']
    if user.persisted?
      api_key = user.api_keys.build
      api_key.save

      cookies[:access_token] = {
        value: api_key.access_token,
        expires: api_key.expires_at
      }

      flash.notice = 'Signed in using Google'
      sign_in_and_redirect user
    else
      session['devise.user_attributes'] = user.attributes
      flash.notice = "You are almost done. Please provide a password to finish setting up your account"
    end
  end
end
