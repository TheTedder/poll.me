class PollSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  has_many :candidates
end
