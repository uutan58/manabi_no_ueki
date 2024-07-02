class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user! # Deviseなどを使用している場合

  # GET /schedules.json
  def index
    @schedules = current_user.schedules.includes(:category)
    render json: @schedules.to_json(include: :category)
  end

  # POST /schedules
  # POST /schedules.json
  def create
    @schedule = current_user.schedules.build(schedule_params)
    @schedule.category = Category.find_or_create_by(name: schedule_params[:category_name])

    respond_to do |format|
      if @schedule.save
        format.json { render json: @schedule, status: :created }
      else
        format.json { render json: @schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /schedules/1
  # PATCH/PUT /schedules/1.json
  def update
    @schedule.category = Category.find_or_create_by(name: schedule_params[:category_name])
    respond_to do |format|
      if @schedule.update(schedule_params)
        format.json { render json: @schedule, status: :ok }
      else
        format.json { render json: @schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /schedules/1
  # DELETE /schedules/1.json
  def destroy
    @schedule.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_schedule
      @schedule = current_user.schedules.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def schedule_params
      params.require(:schedule).permit(:title, :start_at, :end_at, :category_name)
    end
end