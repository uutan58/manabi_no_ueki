# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_07_05_090148) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "introduction"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.string "title"
    t.text "detail"
    t.datetime "start_at"
    t.datetime "end_at"
    t.string "location"
    t.boolean "is_completed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_schedules_on_category_id"
    t.index ["user_id"], name: "index_schedules_on_user_id"
  end

  create_table "study_time_records", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "schedule_id", null: false
    t.date "study_date"
    t.time "start_time"
    t.time "end_time"
    t.integer "duration"
    t.text "study_content"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "processed"
    t.index ["schedule_id"], name: "index_study_time_records_on_schedule_id"
    t.index ["user_id"], name: "index_study_time_records_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.string "name", null: false
    t.text "description"
    t.integer "priority"
    t.date "deadline"
    t.date "start_date"
    t.date "completion_date"
    t.integer "status", default: 0
    t.integer "completion_rate", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_tasks_on_category_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "reset_password_token_expires_at"
    t.datetime "remember_created_at"
    t.datetime "confirmation_token_expires_at"
    t.datetime "last_login_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "qiita_access_token"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "profiles", "users"
  add_foreign_key "schedules", "categories"
  add_foreign_key "schedules", "users"
  add_foreign_key "study_time_records", "schedules", on_delete: :cascade
  add_foreign_key "study_time_records", "users"
  add_foreign_key "tasks", "categories"
  add_foreign_key "tasks", "users"
end
