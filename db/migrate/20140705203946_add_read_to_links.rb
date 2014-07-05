class AddReadToLinks < ActiveRecord::Migration
  def change
    add_column :links, :read, :boolean, default: false
  end
end
