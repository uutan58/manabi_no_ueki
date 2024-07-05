class TopController < ApplicationController
  before_action :authenticate_user!

  def index
    @schedules = Schedule.all
    @tasks = Task.all
    @study_time_records = current_user.study_time_records
  end
end
