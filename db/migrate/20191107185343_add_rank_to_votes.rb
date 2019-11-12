class AddRankToVotes < ActiveRecord::Migration[6.0]
  def change
    add_column :votes, :rank, :integer, null: false
  end
end
