class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.belongs_to :candidate, null: false
      t.belongs_to :link, null: false
    end
  end
end
