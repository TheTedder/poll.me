class PollSerializer < ActiveModel::Serializer
  attributes :name, :description, :open, :votes_per_person, :privacy

  has_many :candidates

  def open
    object.open?
  end
end
