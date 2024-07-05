class SchedulesController < ApplicationController
  before_action :authenticate_user!

  def index
    @schedules = current_user.schedules.includes(:category)
    render json: @schedules.as_json(include: { category: { only: [:name] } })
  end

  def create
    @schedule = current_user.schedules.build(schedule_params)
    category = Category.find_or_create_by(name: schedule_params[:category_name])
    @schedule.category = category

    if @schedule.save
      create_study_time_record(@schedule)
      render json: @schedule, status: :created
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  def update
    @schedule = Schedule.find(params[:id])
    category = Category.find_or_create_by(name: schedule_params[:category_name])
    @schedule.category = category

    if @schedule.update(schedule_params)
      update_study_time_record(@schedule)
      render json: @schedule, status: :ok
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @schedule = current_user.schedules.find_by(id: params[:id])
    if @schedule
      begin
        ActiveRecord::Base.transaction do
          @schedule.study_time_record&.destroy
          @schedule.destroy
        end
        render json: { message: '削除しました' }, status: :ok
      rescue => e
        logger.error "Failed to delete schedule: #{e.message}"
        render json: { error: '削除中にエラーが発生しました' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'スケジュールが見つかりませんでした' }, status: :not_found
    end
  end

  private

  def schedule_params
    params.require(:schedule).permit(:title, :category_name, :start_at, :end_at)
  end

  def create_study_time_record(schedule)
    StudyTimeRecord.create!(
      user: schedule.user,
      schedule: schedule,
      study_date: schedule.start_at.to_date,
      start_time: schedule.start_at.strftime("%H:%M"),
      end_time: schedule.end_at.strftime("%H:%M"),
      duration: ((schedule.end_at - schedule.start_at) / 60).to_i,
      study_content: schedule.title,
      comment: schedule.category_name
    )
  end

  def update_study_time_record(schedule)
    study_time_record = StudyTimeRecord.find_by(schedule_id: schedule.id)
    if study_time_record
      study_time_record.update!(
        study_date: schedule.start_at.to_date,
        start_time: schedule.start_at.strftime("%H:%M"),
        end_time: schedule.end_at.strftime("%H:%M"),
        duration: ((schedule.end_at - schedule.start_at) / 60).to_i,
        study_content: schedule.title,
        comment: schedule.category_name
      )
    end
  end
end