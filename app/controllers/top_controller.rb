class TopController < ApplicationController
  before_action :authenticate_user!

  def index
    @schedules = Schedule.all
  end
end
