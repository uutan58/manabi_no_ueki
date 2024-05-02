class UsersController < ApplicationController
  def show
    @user = User.find_by(id: params[:id]) || User.new
    # @user = User.find_by(id: params[:id])
    # unless @user
    #   redirect_to root_path, alert: "ユーザーが見つかりません"
    # end
  end
end