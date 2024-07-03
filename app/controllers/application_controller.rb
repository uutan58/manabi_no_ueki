class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # ログイン済ユーザーのみにアクセスを許可する
  # before_action :authenticate_user!

  # deviseコントローラーにストロングパラメータを追加する
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # サインアップ時に必要なストロングパラメータを追加
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation])
    # アカウント編集の時に必要なストロングパラメータを追加
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :profile, :password, :password_confirmation, :current_password])
  end

  def after_sign_in_path_for(resource)
    top_index_path
  end

  def after_sign_in_path_for(resource)
    authenticated_root_path
  end
end