class LinkSerializer < ActiveModel::Serializer
  attributes :single_use, :valid
  
  belongs_to :poll
end