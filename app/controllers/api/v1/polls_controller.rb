class Api::V1::PollsController < ApplicationController
  def create
    poll = Poll.new(poll_params)
    poll.voting_deadline = Time.zone.iso8601(params['poll']['votingDeadline']) unless params['poll']['votingDeadline'].nil?
    if poll.save
      params['poll']['options'].each do |option|
        Candidate.create(name: option, poll: poll)
      end
      if poll.valid?
        render json: {id: poll.id, slug: Link.create(poll: poll).slug}
        return
      else
        poll.destroy
      end
    end
    render json: {errors: poll.errors}
  end

  def show
    render json: Poll.find(params['id']), serializer: PollMonitorSerializer
  end

  private
  def poll_params
    params.require(:poll).permit(:name, :description)
  end
end