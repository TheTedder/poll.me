class AddSlugIndex < ActiveRecord::Migration[6.0]
  def change
    add_index :links, :slug
  end
end
