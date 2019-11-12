class AddTimestampsToVotes < ActiveRecord::Migration[6.0]
  def change
    add_timestamps :votes
    add_timestamps :links
  end
end
