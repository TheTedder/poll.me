class AddSlugToLinks < ActiveRecord::Migration[6.0]
  def change
    add_column :links, :slug, :string, null: false
  end
end
