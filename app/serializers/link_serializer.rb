class LinkSerializer < ActiveModel::Serializer
  attributes :valid, :slug
  
  belongs_to :poll
end