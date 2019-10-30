class Poll < ApplicationRecord
  has_many :candidates

  validates :name, presence: true
  validates :candidates, length: { minimum: 2, message: 'must have at least two options' }, unless: -> { new_record? }
  # def vote_count
  #   candidates.sum{ |candidate| candidate.votes.count }
  # end
end