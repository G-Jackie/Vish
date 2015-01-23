class AddFieldsToTrackingSystemEntry < ActiveRecord::Migration
  def up
    add_column :tracking_system_entries, :user_agent, :text
    add_column :tracking_system_entries, :referrer, :text
    add_column :tracking_system_entries, :actor_id, :integer
  end

  def down
    remove_column :tracking_system_entries, :user_agent
    remove_column :tracking_system_entries, :referrer
    remove_column :tracking_system_entries, :actor_id
  end
end
