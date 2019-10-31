class Vote < ApplicationModel
  belongs_to :candidate
  belongs_to :link

  validates :candidate_id, presence: true
  validates :link_id, presence: true
  validates :link_id, uniqueness: true, if: -> { link.single_use }
end