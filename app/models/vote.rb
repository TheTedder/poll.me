class Vote < ApplicationRecord
  belongs_to :candidate
  belongs_to :link
  after_commit :broadcast

  validates :link_id, presence: true
  validates :link_id, uniqueness: true, if: -> { link.single_use }
  validate :candidate_belongs_to_poll
  validate :poll_is_open

  protected
  def candidate_belongs_to_poll
    unless link.poll == candidate.poll
      errors.add(:candidate, 'must be a valid candidate')
    end
  end

  def poll_is_open
    unless link.poll.open?
      errors.add(:poll, 'must be open')
    end
  end

  def broadcast
    ActionCable.server.broadcast("result_#{link.poll.id}", { candidate_id: candidate.id })
  end
end