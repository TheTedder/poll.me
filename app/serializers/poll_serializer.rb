class PollSerializer < ActiveModel::Serializer
  attributes :name, :description

  has_many :candidates
end
