class Poll < ApplicationRecord
  has_many :candidates

  validates :name, presence: true

  # def vote_count
  #   candidates.sum{ |candidate| candidate.votes.count }
  # end
end