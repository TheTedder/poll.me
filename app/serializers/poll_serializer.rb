class PollSerializer < ActiveModel::Serializer
  attributes :name, :description, :open

  has_many :candidates

  def open
    object.open?
  end
end
