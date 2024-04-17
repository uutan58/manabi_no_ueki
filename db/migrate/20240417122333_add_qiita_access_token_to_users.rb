class AddQiitaAccessTokenToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :qiita_access_token, :string
  end
end
