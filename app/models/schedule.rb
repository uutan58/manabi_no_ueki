class Schedule < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :title, presence: true
  validates :start_at, presence: true
  validates :end_at, presence: true
  validates :user, presence: true
  validates :category, presence: true

  attr_accessor :category_name
end