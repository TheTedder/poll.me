require 'rails_helper'

RSpec.describe Api::V1::PollsController, type: :controller do
  describe "POST#create" do
    it 'accepts a poll with a name and options' do
      post :create, params: {
        poll: {
          name: 'My Poll',
          description: 'help me decide',
          options: [
            'option 1',
            'option 2'
          ]
        }
      },
      format: :json
      expect(JSON.parse(response.body)['id']).to be_instance_of(Integer)
    end
    it "doesn't accept a poll without a name" do
      post :create, params: {
        poll: {
          description: 'help me decide',
          options: [
            'option 1',
            'option 2'
          ]
        }
      },
      format: :json
      expect(JSON.parse(response.body)['errors']['name'][0]).to eq("can't be blank")
    end
    it "doesn't accept a poll without options" do
      post :create, params: {
        poll: {
          name: 'My Poll',
          description: 'help me decide',
          options: ["", ""]
        }
      },
      format: :json
      expect(JSON.parse(response.body)['errors']).to include('candidates')
    end
    it 'accepts a poll without a description' do
      post :create, params: {
        poll: {
          name: 'My Poll',
          options: [
            'option 1',
            'option 2'
          ]
        }
      },
      format: :json
      expect(JSON.parse(response.body)['id']).to be_instance_of(Integer)
    end
    it "doesn't create a poll with blank options" do
      post :create, params: {
        poll: {
          name: 'My Poll',
          description: 'help me decide',
          options: [
            'option 1',
            "",
            'option 2'
          ]
        }
      },
      format: :json
      id = JSON.parse(response.body)['id']
      poll = Poll.find(id)
      expect(poll.candidates.map{ |candidate| candidate['name'] }).not_to include(be_blank?)
    end
  end
end