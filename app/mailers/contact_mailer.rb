class ContactMailer < ApplicationMailer
  default to: '58uutan92@gmail.com'

  def contact_email(contact)
    @contact = contact
    mail(subject: '新しいお問い合わせがありました')
  end
end
