class Link < ApplicationRecord
  belongs_to :poll
  has_many :votes
  has_secure_token :slug

  validates :poll_id, presence: true
  validates :single_use, inclusion: { in: [true, false] }, allow_nil: true

  def self.generate_unique_secure_token
    SecureRandom.base58(6)
  end
end