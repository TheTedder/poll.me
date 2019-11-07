class Api::V1::VotesController < ApplicationController
  def create
    vote = Vote.create(link: Link.find_by(slug: params['token']))
    params['vote']['candidates'].each.with_index(1) do |candidate_id, index|
      Ranking.create(vote: vote, candidate_id: candidate_id, rank: index)
    end
    unless vote.save
      render json: vote.errors, status: :bad_request
    end
  end
end