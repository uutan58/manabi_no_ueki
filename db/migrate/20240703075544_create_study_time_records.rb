class CreateStudyTimeRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :study_time_records do |t|
      t.references :user, null: false, foreign_key: true
      t.references :schedule, null: false, foreign_key: true
      t.date :study_date
      t.time :start_time
      t.time :end_time
      t.integer :duration
      t.text :study_content
      t.text :comment

      t.timestamps
    end
  end
end
