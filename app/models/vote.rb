class Vote < ApplicationRecord
  belongs_to :link
  has_many :rankings

  validates :link_id, presence: true
  validates :link_id, uniqueness: true, if: -> { link.single_use }
  validate :poll_is_open
  validate :has_rankings

  protected
  def poll_is_open
    unless link.poll.open?
      errors.add(:poll, 'must be open')
    end
  end

  def has_rankings
    !rankings.empty?
  end
end