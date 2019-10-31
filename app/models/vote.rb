class Vote < ApplicationModel
  belongs_to :candidate
  belongs_to :link
  after_validation :broadcast

  validates :candidate_id, inclusion: { in: link.poll.candidates  }
  validates :link_id, presence: true
  validates :link_id, uniqueness: true, if: -> { link.single_use }

  protected

  def broadcast
    ResultChannel.broadcast_for(link.poll, link_id: id)
  end
end