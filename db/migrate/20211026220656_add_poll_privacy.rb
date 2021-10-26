class AddPollPrivacy < ActiveRecord::Migration[6.1]
  def change
    change_table :polls do |t|
        t.integer :privacy, default: 0, null: false, comment: "Enum type. Current possible values are 0 for public and 1 for private"
    end
  end
end
