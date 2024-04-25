class Schedule < ApplicationRecord
  belongs_to :user
  belongs_to :category

  has_calendar_ebent :start_at, :end_at, name: :title
end
