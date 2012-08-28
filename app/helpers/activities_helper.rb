module ActivitiesHelper
  # Javascript line to fetch or create the modal dialog
  def modal_for(object)
    if object.acts_as_actor?
      "m = Vish.Wall.getUserModal('#{object.slug}', #{ user_signed_in? ? "true" : "false" }, '#{raw j truncate_name(object.name, :length => 75)}', '#{ raw j contact_to(object)}');
       m.on('shown', function(){
         $.ajax('/users/#{ object.actor.slug }/modal');
       });
       m.on('hidden', function(){
       });"
    else
      "m = Vish.Wall.getModal('#{object.class.to_s.downcase}', '#{object.id.to_s}', #{ user_signed_in? ? "true" : "false" }, #{object.activities.first.id.to_s}, #{ user_signed_in? and object.activities.first.liked_by?(current_subject) ? "true" : "false" }, '#{ raw j truncate_name(object.title , :length => 75) }');
       m.on('shown', function(){
         $.ajax('/#{ object.class.to_s.pluralize.underscore }/#{ object.id.to_s }/modal');
       });
       m.on('hidden', function(){
         $('##{ object.class.to_s.downcase }-modal-#{ object.id.to_s } .modal-body').html ('#{ raw j image_tag("loading.gif", :class => :loading) }');
       });"
    end
  end

  # Link to 'like' or 'unlike' depending on the like status of the activity to current_subject
  #
  # @param [Object]
  # @return [String]
  def link_like(object, options={})
    options[:size] ||= :small
    params = link_like_params(object, options)
    link_to params[0],params[1],params[2]
  end

  def link_like_params(object,options)
    params = Array.new
    if !user_signed_in?
      params << if options[:size] == :small
                  image_tag("star-off10.png", :class => "menu_icon")
                else
                  image_tag("star-off.png", :class => "menu_icon")
                end
      params << new_user_session_path
      params << {:class => "verb_like like_size_" + options[:size].to_s + " like_" + dom_id(object)}
    else
      if (object.liked_by?(current_subject))
        params << if options[:size] == :small
                    image_tag("star-on10.png", :class => "menu_icon")
                  else
                    image_tag("star-on.png", :class => "menu_icon")
                  end
        params << [object, :like]
        params << {:class => "verb_like like_size_" + options[:size].to_s + " like_" + dom_id(object),:method => :delete, :remote => true}
      else
        params << if options[:size] == :small
                    image_tag("star-off10.png", :class => "menu_icon")
                  else
                    image_tag("star-off.png", :class => "menu_icon")
                  end
        params << [object, :like]
        params << {:class => "verb_like like_size_" + options[:size].to_s + " like_" + dom_id(object),:method => :post, :remote => true}
      end
    end
  end

  # Build a new post based on the current_subject. Useful for authorization queries
  def new_post(receiver)
    return Post.new unless user_signed_in?

    Post.new :author_id => Actor.normalize_id(current_subject),
             :owner_id  => Actor.normalize_id(receiver)
  end
end
