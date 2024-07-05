class User < ApplicationRecord
  has_many :schedules, dependent: :destroy
  has_many :study_time_records, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile

  validates :name, presence: true,
                   length: { maximum: 50 }

  validates :email, uniqueness: true

  def completed_study_times
    completed_schedules = schedules.where(is_completed: true)
    study_time_records.where(schedule: completed_schedules)
  end
end