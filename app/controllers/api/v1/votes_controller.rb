class Api::V1::VotesController < ApplicationController
  def create
    vote = Vote.create(link: Link.find_by(slug: params['token']))
    params['vote']['candidates'].each.with_index(1) do |candidate_id, index|
      ranking = Ranking.create(vote: vote, candidate_id: candidate_id, rank: index)
    end
    if vote.save
      data = Hash.new
      vote.rankings.each do |ranking|
        data[ranking.candidate_id] = ranking.candidate.vote_count
      end
      ActionCable.server.broadcast("result_#{vote.link.poll.id}", data)
    else
      render json: vote.errors, status: :bad_request
    end
  end
end