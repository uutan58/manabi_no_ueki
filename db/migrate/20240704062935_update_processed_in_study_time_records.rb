class UpdateProcessedInStudyTimeRecords < ActiveRecord::Migration[7.0]
  def change
    StudyTimeRecord.update_all(processed: true)
  end
end