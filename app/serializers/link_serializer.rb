class LinkSerializer < ActiveModel::Serializer
  attributes :valid, :slug, :single_use
  
  belongs_to :poll
end