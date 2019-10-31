class Poll < ApplicationRecord
  has_many :candidates
  has_many :links
  has_many :votes, through: :candidates

  validates :name, presence: true
  validates :candidates, length: { minimum: 2, message: 'must have at least two options' }, unless: -> { new_record? }
end