class VoteChannel < ApplicationCable::Channel
  def subscribed
    stream_from "vote_#{params['token']}"
    ActionCable.server.broadcast("vote_#{params['token']}", { canVote: can_vote() })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    link = Link.find_by(slug: params['token'])
    Vote.create(link: link, candidate_id: data['candidate_id'])
    ActionCable.server.broadcast("vote_#{params['token']}", { canVote: can_vote })
  end

  def can_vote
    link = Link.find_by(slug: params['token'])
    !link.single_use || link.votes.empty?
  end
end
