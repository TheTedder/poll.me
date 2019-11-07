class Candidate < ApplicationRecord
  belongs_to :poll
  has_many :votes

  validates :name, presence: true

  def vote_count
    votes.sum{ |vote| 1.fdiv(vote.rank) }
  end
end