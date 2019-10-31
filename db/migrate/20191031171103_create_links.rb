class CreateLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :links do |t|
      t.belongs_to :poll, null: false
      t.boolean :single_use, default: false
    end
  end
end
