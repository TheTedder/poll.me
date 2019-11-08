class Api::V1::LinksController < ApplicationController
  def show
    render json: Link.find_by(slug: params['id']), include: ['poll.candidates']
  end
end