class Poll < ApplicationRecord
  has_many :candidates
  has_many :links
  has_many :votes, through: :candidates

  validates :name, presence: true
  validates :candidates, length: { minimum: 2, message: 'must have at least two options' }, unless: -> { new_record? }
  validate :valid_deadline

  def open?
    return (voting_deadline.nil? || voting_deadline >= DateTime.now) && links.any?{ |link| link.valid }
  end

  protected
  def valid_deadline
    unless voting_deadline.nil? || voting_deadline >= DateTime.now
      errors.add(:voting_deadline, 'must not be in the past')
    end
  end
end