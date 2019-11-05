class VoteChannel < ApplicationCable::Channel
  def subscribed
    stream_from "vote_#{params['token']}"
    @link = Link.find_by(slug: params['token'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    Vote.create(link: @link, candidate_id: data['candidate_id'])
    ActionCable.server.broadcast("vote_#{params['token']}", { valid: @link.valid })
  end
end
