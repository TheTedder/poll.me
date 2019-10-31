class VoteChannel < ApplicationCable::Channel
  def subscribed
    stream_for Link.find_by(slug: params['token'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    link = Link.find_by(slug: params['token'])
    poll = link.poll
    Vote.create(poll: poll, candidate_id: data['candidate_id'])
  end
end
