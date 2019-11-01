class Candidate < ApplicationRecord
  belongs_to :poll
  has_many :votes

  validates :name, presence: true

  def vote_count
    votes.count
  end
end