class Poll < ApplicationRecord
  has_many :votes

  validates :name, presence: true

  def vote_count
    return votes.count
  end
end