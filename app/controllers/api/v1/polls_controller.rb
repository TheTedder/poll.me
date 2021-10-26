require "active_support"
require "active_support/core_ext/object/blank"

class Api::V1::PollsController < ApplicationController
  @@LIMIT_DEFAULT = 12
  @@LIMIT_MAX = 1024

  def create
    poll = Poll.new(poll_params)
    poll.voting_deadline = Time.zone.iso8601(params['poll']['votingDeadline'].presence)
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

  def index
    render json: Poll.public.limit([params['limit'].presence || @@LIMIT_DEFAULT, @@LIMIT_MAX].min).order("COALESCE(voting_deadline, created_at), DESC")
  end

  private
  def poll_params
    params.require(:poll).permit(:name, :description)
  end
end