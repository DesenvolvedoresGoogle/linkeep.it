class CreateApiKeys < ActiveRecord::Migration
  def change
    create_table :api_keys do |t|
      t.string :access_token, null: false
      t.datetime :expires_at
      t.references :user, null: false, index: true
      t.boolean :active, null: false, default: true

      t.timestamps
    end

    add_index :api_keys, :access_token, unique: true
  end
end
