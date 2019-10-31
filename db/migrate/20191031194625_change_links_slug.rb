class ChangeLinksSlug < ActiveRecord::Migration[6.0]
  def up
    change_column_null :links, :slug, true
    remove_index :links, :slug
    add_index :links, :slug, unique: true
  end

  def down
    change_column_null :links, :slug, false
    remove_index :links, :slug
    add_index :links, :slug
  end
end
