class Task < ApplicationRecord
  belongs_to :user
  belongs_to :category

  enum priority: { 低: 0, 中: 1, 高: 2 }
  enum status: { 未着手: 0, 進行中: 1, 完了: 2, 保留: 3 }

  validates :name, presence: true
  validates :completion_rate, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
end