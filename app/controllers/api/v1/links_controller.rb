class Api::V1::LinksController < ApplicationController
  def show
    render json: Link.find_by(slug: params['id']), include: ['poll.candidates']
  end

  def create
    link = Link.new(link_params.merge(poll_id: params['poll_id']))
    if link.save
      render json: link, serializer: LinkCreateSerializer
    else
      head 400
    end
  end

  private
  def link_params
    params.require(:link).permit(:single_use)
  end
end