class Api::V1::PollsController < 
  def create
    poll = Poll.new(poll_params)
    params['poll']['options'].each do |text|
      option = Option.new(name: text)
      if option.save
        poll.candidates << option
      end
    end
    poll.save
  end

  private
  def poll_params
    params.require(:poll).permit(:name, :description)
  end
end