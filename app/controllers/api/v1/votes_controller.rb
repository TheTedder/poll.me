class Api::V1::VotesController < ApplicationController
  def create
    vote = Vote.new(link: Link.find_by(slug: params['token']), candidate_id: params['candidateId'])
    unless vote.save
      head :bad_request
    end
  end
end