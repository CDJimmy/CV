class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.index   :id
      t.integer :indexOrder
      t.string  :firstName
      t.string  :lastName
      t.string  :civility
      t.integer :age
      t.string  :email
      t.string  :colorBackground
      t.string  :colorTitle

      t.timestamps null: false
    end
  end
  def down
    drop_table :users
  end
end
