class Link < ApplicationRecord
  belongs_to :poll
  #has_many :votes

  validates :poll_id, presence: true
  validates :single_use, inclusion: { in: [true, false] }, allow_nil: true

  before_create do
    if(Link.count > 0)
      self.slug = Link.last.slug.succ
    else
      self.slug = 'aaaa'
    end
  end
end