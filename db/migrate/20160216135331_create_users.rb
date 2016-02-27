class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.index   :id
      t.integer :index_order
      t.string  :first_name
      t.string  :last_name
      t.string  :civility
      t.integer :age
      t.string  :email
      t.string  :color_background
      t.string  :color_title

      t.timestamps null: false
    end
  end
  def down
    drop_table :users
  end
end
