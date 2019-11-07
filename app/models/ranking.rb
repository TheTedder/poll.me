class Ranking < ApplicationRecord
  belongs_to :vote
  belongs_to :link, through: :vote
  belongs_to :candidate

  validates :vote_id, presence: true
  validates :candidate_id, presence: true
  validates :rank, numericality: { greater_than_or_equal_to: 1, only_integer: true }, uniqueness: { scope: :vote_id }
  validate candidate_belongs_to_poll
  validate valid_rank

  def rank_available?(num)
    return true if num == 1
    1...num.all?{ |rank| Ranking.exists?({ rank: rank, vote: vote }) }
  end

  protected
  def candidate_belongs_to_poll
    if link.poll != candidate.poll
      errors.add(:candidate, 'must be a valid candidate in the poll')
    end
  end

  def valid_rank
    unless rank <= link.poll.votes_per_person && rank_available?(rank)
      errors.add(:rank, 'is not available')
    end
  end
end