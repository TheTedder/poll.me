class CandidateMonitorSerializer < ActiveModel::Serializer
  attributes :id, :name, :vote_count
end