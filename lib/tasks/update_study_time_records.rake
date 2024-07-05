namespace :study_time do
  desc "カレンダーの予定から学習時間記録を更新する"
  task update: :environment do
    schedules = Schedule.where('end_at < ?', Time.current).where(is_completed: false)
    Rails.logger.info "Found #{schedules.count} schedules to update"

    schedules.find_each do |schedule|
      Rails.logger.info "Processing schedule #{schedule.id} with end_at: #{schedule.end_at}, is_completed: #{schedule.is_completed}"
      begin
        study_time_record = Studytimerecord.create!(
          user_id: schedule.user_id,
          schedule_id: schedule.id,
          study_date: schedule.start_at.to_date,
          start_time: schedule.start_at,
          end_time: schedule.end_at,
          duration: ((schedule.end_at - schedule.start_at) / 60).to_i,
          study_content: schedule.title,
          comment: schedule.detail,
          processed: true
        )
        schedule.update!(is_completed: true)
        Rails.logger.info "Created study time record #{study_time_record.id} for schedule #{schedule.id}"
      rescue => e
        Rails.logger.error "Error processing schedule #{schedule.id}: #{e.message}"
        Rails.logger.error e.backtrace.join("\n")
      end
    end
  rescue => e
    Rails.logger.error "Error in update_study_time_records task: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
  end
end







