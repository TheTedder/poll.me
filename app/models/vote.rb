class Vote < ApplicationRecord
  belongs_to :link
  belongs_to :poll, through: :link
  has_many :rankings
  after_commit :broadcast

  validates :link_id, presence: true
  validates :link_id, uniqueness: true, if: -> { link.single_use }
  validate :poll_is_open

  protected
  def poll_is_open
    unless poll.open?
      errors.add(:poll, 'must be open')
    end
  end

  def broadcast
    ActionCable.server.broadcast("result_#{poll.id}", { candidate_id: candidate.id })
  end
end