class FixStudyTimeRecordsDates < ActiveRecord::Migration[7.0]
  def up
    StudyTimeRecord.find_each do |record|
      study_date = record.study_date.to_date
      start_time = study_date.to_datetime + record.start_time.seconds_since_midnight.seconds
      end_time = study_date.to_datetime + record.end_time.seconds_since_midnight.seconds
      record.update_columns(
        start_time: start_time,
        end_time: end_time
      )
    end
  end
end
