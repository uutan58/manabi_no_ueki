class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:show]
  before_action :set_user, only: [:show, :edit, :update]

  def show
    # プロフィール表示のロジック
  end

  def edit
    @profile = @user.profile || @user.build_profile
  end

  def update
    @profile = @user.profile || @user.build_profile

    if @user.update(user_params)
      redirect_to @user, notice: 'プロフィールが更新されました。'
    else
      render :edit
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, profile_attributes: [:introduction])
  end
end