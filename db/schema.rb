# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_07_214453) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "candidates", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "poll_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_candidates_on_poll_id"
  end

  create_table "links", force: :cascade do |t|
    t.bigint "poll_id", null: false
    t.boolean "single_use", default: false
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_links_on_poll_id"
    t.index ["slug"], name: "index_links_on_slug", unique: true
  end

  create_table "polls", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "voting_deadline"
  end

  create_table "rankings", force: :cascade do |t|
    t.bigint "vote_id", null: false
    t.bigint "candidate_id", null: false
    t.integer "rank", null: false
    t.index ["candidate_id"], name: "index_rankings_on_candidate_id"
    t.index ["vote_id"], name: "index_rankings_on_vote_id"
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "link_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["link_id"], name: "index_votes_on_link_id"
  end

end
