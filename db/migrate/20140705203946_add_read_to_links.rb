class AddReadToLinks < ActiveRecord::Migration
  def change
    add_column :links, :read, :boolean, null: false, default: false
  end
end
