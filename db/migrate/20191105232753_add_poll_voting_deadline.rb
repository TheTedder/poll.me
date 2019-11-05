class AddPollVotingDeadline < ActiveRecord::Migration[6.0]
  def change
    add_column :polls, :voting_deadline, :datetime
  end
end
