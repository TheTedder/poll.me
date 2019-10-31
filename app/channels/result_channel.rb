class ResultChannel < ApplicationCable::Channel
  def subscribed
    stream_for Poll.find(params['id'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
