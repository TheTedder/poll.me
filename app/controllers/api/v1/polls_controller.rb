class Api::V1::PollsController < ApplicationController
  def create
    poll = Poll.new(poll_params)
    if poll.save
      params['poll']['options'].each do |text|
        Candidate.create(name: text, poll: poll)
      end
    else
      render json: {errors: poll.errors}
    end
  end

  private
  def poll_params
    params.require(:poll).permit(:name, :description)
  end
end