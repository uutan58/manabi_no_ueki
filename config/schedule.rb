set :output, "log/cron_log.log"

every 1.minute do
  rake "study_time:update"
end