class LinkSerializer < ActiveModel::Serializer
  attributes :valid, :slug, :single_use, :id
  
  belongs_to :poll
end