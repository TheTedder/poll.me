class Candidate < ApplicationRecord
  belongs_to :poll
  has_many :rankings

  validates :name, presence: true

  def vote_count
    rankings.sum{ |ranking| ranking.worth }
  end
end