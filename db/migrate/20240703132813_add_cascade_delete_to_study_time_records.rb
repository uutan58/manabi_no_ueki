class AddCascadeDeleteToStudyTimeRecords < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :study_time_records, :schedules

    add_foreign_key :study_time_records, :schedules, on_delete: :cascade
  end
end
