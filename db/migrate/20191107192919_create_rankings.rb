class CreateRankings < ActiveRecord::Migration[6.0]
  def change
    create_table :rankings do |t|
      t.belongs_to :vote, null: false
      t.belongs_to :candidate, null: false
      t.integer :rank, null: false
    end

    remove_index :votes, column: :candidate_id, name: :index_votes_on_candidate_id
    remove_column :votes, :candidate_id, :bigint, null: false
    remove_column :votes, :rank, :integer, null: false
  end
end
