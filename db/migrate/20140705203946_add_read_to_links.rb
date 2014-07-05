class AddReadToLinks < ActiveRecord::Migration
  def change
    add_column :links, :read, :boolean
  end
end
