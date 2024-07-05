class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    case params[:status]
    when 'completed'
      @tasks = current_user.tasks.where(status: :完了)
    else
      @tasks = current_user.tasks.where.not(status: :完了)
    end
  end

  def show
  end

  def new
    @task = current_user.tasks.build
  end

  def create
    @task = current_user.tasks.build(task_params)
    handle_category

    if @task.save
      redirect_to @task, notice: 'タスクが作成されました。'
    else
      render :new
    end
  end

  def edit
  end

  def update
    handle_category

    if @task.update(task_params)
      message = @task.完了? ? 'タスクが完了しました。' : 'タスクが更新されました。'
      redirect_to tasks_url, notice: message
    else
      render :edit
    end
  end

  def destroy
    @task.destroy
    redirect_to tasks_url, notice: 'タスクが削除されました。'
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :deadline, :priority, :start_date, :completion_date, :status, :completion_rate)
  end

  def handle_category
    if params[:task][:category_name].present?
      category = Category.find_or_create_by(name: params[:task][:category_name])
      @task.category = category
    elsif params[:task][:category_id].present?
      @task.category_id = params[:task][:category_id]
    end
  end
end
