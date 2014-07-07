module SocialStream
  module Base
    module ThinkingSphinx
      module Index
        module Builder
          def activity_object_index
            indexes activity_object.title,       :as => :title
            indexes activity_object.description, :as => :description
            indexes activity_object.tags.name,   :as => :tags

            has created_at
            has updated_at

            has activity_object.author_actions(:actor_id), :as => :author_id
            has activity_object.owner_actions(:actor_id),  :as => :owner_id
            has activity_object.activity_object_audiences(:relation_id), :as => :relation_ids

            has activity_object.like_count, :type => :integer, :sortable => true
            has activity_object.visit_count, :type => :integer, :sortable => true
            has activity_object.download_count, :type => :integer, :sortable => true

            has activity_object.popularity, :as => :popularity, :sortable => true
            has activity_object.ranking, :as => :ranking, :sortable => true
          end
        end
      end
    end
  end
end