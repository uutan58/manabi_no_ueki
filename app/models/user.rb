class User < ApplicationRecord
  has_many :schedules, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, :trackable

  validates :name,                presence: true,
                                  length: { maximum: 50 }

  validates :email,               uniqueness: true
end
