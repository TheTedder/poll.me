class Vote < ApplicationRecord
  belongs_to :link
  belongs_to :poll, through: :link
  has_many :rankings
  validates_associated :rankings
  after_commit :broadcast

  validates :link_id, presence: true
  validates :link_id, uniqueness: true, if: -> { link.single_use }
  validates :rankings, length: { minimum: 1 }, unless: -> { new_record? }
  validate :poll_is_open

  protected
  def poll_is_open
    unless poll.open?
      errors.add(:poll, 'must be open')
    end
  end

  def broadcast
    data = Hash.new
    rankings.each do |ranking|
      data[ranking.candidate.id] = ranking.candidate.vote_count
    end
    ActionCable.server.broadcast("result_#{poll.id}", data)
  end
end