class User < ApplicationRecord
  has_many :schedules, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile

  validates :name, presence: true,
                   length: { maximum: 50 }

  validates :email, uniqueness: true
end
