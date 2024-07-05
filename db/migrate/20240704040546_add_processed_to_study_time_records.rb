class AddProcessedToStudyTimeRecords < ActiveRecord::Migration[7.0]
  def change
    add_column :study_time_records, :processed, :boolean, default: false
  end
end
