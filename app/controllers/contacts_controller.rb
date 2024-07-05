class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.valid?
      ContactMailer.contact_email(@contact).deliver_now
      flash[:notice] = 'お問い合わせが送信されました。'
      redirect_to new_contact_path
    else
      render :new
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end

