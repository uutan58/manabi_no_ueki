class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # /users/sign_up
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :phone_number, :name])
  end
end