class TopController < ApplicationController
  def index
    @schedules = Schedule.all
  end
end
