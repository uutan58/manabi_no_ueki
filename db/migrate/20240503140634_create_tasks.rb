class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.integer :priority
      t.date :deadline
      t.date :start_date
      t.date :completion_date
      t.integer :status, default: 0
      t.integer :completion_rate, default: 0

      t.timestamps
    end
  end
end
