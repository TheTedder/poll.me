class Link < ApplicationRecord
  belongs_to :poll
  has_many :votes
  has_secure_token :slug

  validates :poll_id, presence: true
  validates :single_use, inclusion: { in: [true, false] }, allow_nil: true
end