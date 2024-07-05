class StudyTimeRecord < ApplicationRecord
  belongs_to :user
  belongs_to :schedule

  validates :study_date, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :duration, numericality: { greater_than_or_equal_to: 0 }
  validates :study_content, presence: true
end