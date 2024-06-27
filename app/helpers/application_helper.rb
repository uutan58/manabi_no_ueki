module ApplicationHelper
  def translate_status(status_key)
    case status_key
    when "未着手"
      "未着手"
    when "進行中"
      "進行中"
    when "完了"
      "完了"
    when "保留"
      "保留"
    else
      "不明"
    end
  end
end