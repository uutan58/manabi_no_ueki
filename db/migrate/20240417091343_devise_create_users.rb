class DeviseCreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      ## ユーザーがログインするために必要なフィールド
      t.string :name
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## パスワードリセット機能に関連するフィールド
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :reset_password_token_expires_at

      ## ユーザーが「ログイン状態を保持する」を選択したときに使用されるフィールド
      t.datetime :remember_created_at

      ## メールアドレスの認証に使用されるフィールド
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email
      t.datetime :confirmation_token_expires_at

      ## 日時を記録するフィールド
      t.datetime :last_login_at
      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    add_index :users, :confirmation_token,   unique: true
  end
end
