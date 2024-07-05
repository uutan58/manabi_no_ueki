class Schedule < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_one :study_time_record, dependent: :destroy

  validates :title, presence: true
  validates :start_at, presence: true
  validates :end_at, presence: true
  validates :user, presence: true
  validates :category, presence: true

  attr_accessor :category_name

  def display_name
    "#{self.title} (#{self.start_at.strftime('%Y-%m-%d %H:%M')} - #{self.end_at.strftime('%H:%M')})"
  end

  def self.check_and_update_completed_schedules
    schedules_to_update = where("end_at < ? AND is_completed = ?", Time.current, false)
    Rails.logger.info "Found #{schedules_to_update.count} schedules to update"

    schedules_to_update.find_each do |schedule|
      Rails.logger.info "Updating schedule #{schedule.id}"
      schedule.update!(is_completed: true)
      StudyTimeRecord.create!(
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
      Rails.logger.info "Created study time record for schedule #{schedule.id}"
    end
  rescue => e
    Rails.logger.error "Error in check_and_update_completed_schedules: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
  end
end
