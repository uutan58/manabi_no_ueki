class StudyTimeRecordsController < ApplicationController
  before_action :authenticate_user!

  def index
    @study_time_records = StudyTimeRecord.all
    respond_to do |format|
      format.html
      format.json { render json: @study_time_records }
    end
  end

  def new
    @study_time_record = StudyTimeRecord.new
  end

  def create
    @study_time_record = StudyTimeRecord.new(study_time_record_params)
    @study_time_record.user = current_user

    if @study_time_record.save
      schedule = @study_time_record.schedule
      schedule.update(is_completed: true) if schedule
      redirect_to study_time_records_path, notice: '学習時間が記録されました。'
    else
      render :new
    end
  end

  def destroy
    @study_time_record = StudyTimeRecord.find(params[:id])
    @study_time_record.destroy
    redirect_to study_time_records_path, notice: '学習時間が削除されました。'
  end

  def refresh
    @study_time_records = current_user.study_time_records.where('study_date <= ?', Date.today).order(:study_date)
    render json: @study_time_records
  end

  private

  def study_time_record_params
    params.require(:study_time_record).permit(:schedule_id, :study_date, :start_time, :end_time, :duration, :study_content, :comment)
  end
end