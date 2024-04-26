class TopController < ApplicationController
  def index
    @schedules = Schedule.all
  end

  # def new
  #   @schedule = Schedule.new
  # end

  # def show
  #   @schedule = Schedule.find(params[:id])
  # end

  # def create
  #   @schedule = Schedule.new(schedule_params)
  #   if @schedule.save
  #     redirect_to schedules_path, notice: "予定を作成しました。"
  #   else
  #     render 'new'
  #   end
  # end


  # def destroy
  #   @schedule = Schedule.find(params[:id])
  #   @schedule.destroy
  #   redirect_to schedule_path, notice:"削除しました"
  # end

  # def edit
  #   @schedule = Schedule.find(params[:id])
  # end

  # def update
  #   @schedule = Schedule.find(params[:id])
  #   if @schedule.update(schedule_params)
  #     redirect_to schedule_path, notice: "編集しました"
  #   else
  #     render 'edit'
  #   end
  # end

  # private

  # def schedule_params
  #   params.require(:schedule).permit(:title, :content, :start_time)
  # end
end
