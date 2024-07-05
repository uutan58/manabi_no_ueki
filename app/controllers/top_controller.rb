class TopController < ApplicationController
  before_action :authenticate_user!

  def index
    @schedules = current_user.schedules
    @tasks = current_user.tasks
    @study_time_records = current_user.study_time_records
  end
end

