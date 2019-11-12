class Api::V1::VotesController < ApplicationController
  def create
    vote = Vote.create(link: Link.find_by(slug: params['token']))
    params['vote']['candidates'].each.with_index(1) do |candidate_id, index|
      ranking = Ranking.create(vote: vote, candidate_id: candidate_id, rank: index)
    end
    if vote.save
      data = Hash.new
      data['linkId'] = vote.link_id
      data['valid'] = vote.link.valid
      rankings = Hash.new
      vote.rankings.each do |ranking|
        rankings[ranking.candidate_id] = ranking.candidate.vote_count
      end
      data['rankings'] = rankings
      ActionCable.server.broadcast("result_#{vote.link.poll.id}", data)
    else
      render json: vote.errors, status: :bad_request
    end
  end
end