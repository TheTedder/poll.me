class Api::V1::PollsController < ApplicationController
  def create
    poll = Poll.new(poll_params)
    if poll.save
      params['poll']['options'].each do |option|
        Candidate.create(name: option, poll: poll)
      end
      if poll.valid?
        render json: {id: poll.id}
        return
      end
    end
    render json: {errors: poll.errors}
  end

  private
  def poll_params
    params.require(:poll).permit(:name, :description)
  end
end