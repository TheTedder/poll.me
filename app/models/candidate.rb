class Candidate < ApplicationRecord
  belongs_to :poll
  has_many :rankings

  validates :name, presence: true

  def vote_count
    rankings.sum{ |ranking| 1.fdiv(ranking.rank) }
  end
end