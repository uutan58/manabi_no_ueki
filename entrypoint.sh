#!/bin/bash
set -e

# 環境変数を設定
export RAILS_ENV=production
export BUNDLE_APP_CONFIG=/usr/local/bundle
export BUNDLE_GEMFILE=/app/Gemfile
export PATH="/usr/local/bundle/bin:$PATH"

# Wheneverの設定を反映
bundle exec whenever --update-crontab

# cronを起動
service cron start

# サーバーピッドファイルが存在する場合は削除
rm -f /app/tmp/pids/server.pid

# アプリケーションを起動
exec bundle exec rails s -b '0.0.0.0'