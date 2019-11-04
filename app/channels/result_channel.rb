class ResultChannel < ApplicationCable::Channel
  def subscribed
    stream_from "result_#{params['id']}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
