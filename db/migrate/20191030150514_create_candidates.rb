class CreateCandidates < ActiveRecord::Migration[6.0]
  def change
    create_table :candidates do |t|
      t.string :name, null: false
      t.belongs_to :poll, null: false
      t.timestamps
    end
  end
end
