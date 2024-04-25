class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules do |t|
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.string :title
      t.text :detail
      t.datetime :start_at
      t.datetime :end_at
      t.string :location
      t.boolean :is_completed, default: false
      t.timestamps
    end
  end
end
