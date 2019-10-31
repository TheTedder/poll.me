class VoteChannel < ApplicationCable::Channel
  def subscribed
    stream_from "poll_#{params['token']}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    link = Link.find_by(slug: params['token'])
    poll = link.poll
    vote = Vote.new(poll: poll, candidate_id: data['candidate_id'])
    if vote.save
      ApplicationCable.server.broadcast("", { candidate_id: vote.canididate.id })
    end
  end
end
