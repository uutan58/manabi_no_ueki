class StaticpagesController < ApplicationController
  def index
    @tasks = user_signed_in? ? current_user.tasks.where.not(status: :完了) : []
  end
end