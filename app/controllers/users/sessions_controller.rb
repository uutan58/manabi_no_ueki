class Users::SessionsController < Devise::SessionsController
  def create
    Rails.logger.debug("ログイン試行: #{params[:user][:name]}")
    self.resource = warden.authenticate(auth_options)
    if self.resource
      Rails.logger.debug("ログインに成功しました: #{resource.inspect}")
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      respond_with resource, location: after_sign_in_path_for(resource)
    else
      Rails.logger.debug("ログインに失敗しました: 無効な資格情報")
      flash.now[:alert] = "無効なユーザー名またはパスワードです。"
      respond_with resource, location: new_session_path(resource_name)
    end
  end
end
