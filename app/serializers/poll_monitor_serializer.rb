class PollMonitorSerializer < ActiveModel::Serializer
  attributes :name, :description

  has_many :candidates, order: :vote_count, serializer: CandidateMonitorSerializer
  has_many :links
end