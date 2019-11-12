class LinkCreateSerializer < ActiveModel::Serializer
  attributes :valid, :slug, :single_use, :id
end