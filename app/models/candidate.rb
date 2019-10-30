class Candidate < ApplicationRecord
  belongs_to :poll
  #has_many :votes

  validates :name, presence: true
end