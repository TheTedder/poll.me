class LinkSerializer < ActiveModel::Serializer
  attributes :single_use, :valid, :slug
  
  belongs_to :poll
end