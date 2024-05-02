class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, :trackable

  has_one :profile

  validates :name,                presence: true,
                                  length: { maximum: 50 }

  validates :email,               uniqueness: true
end
