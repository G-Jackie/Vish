module ActivitiesHelper
  # Link to 'like' or 'unlike' depending on the like status of the activity to current_subject
  #
  # @param [Object]
  # @return [String]
  def link_like(object)
    params = link_like_params(object)
    link_to params[0],params[1],params[2]
  end

  def link_like_params(object)
    params = Array.new
    if !user_signed_in?
      params << image_tag("star2.png", :class => "menu_icon")
      params << new_user_session_path
      params << {:class => "verb_like",:id => "like_" + dom_id(object)}
    else
      if (object.liked_by?(current_subject))
        params << image_tag("star1.png", :class => "menu_icon")
        params << [object, :like]
        params << {:class => "verb_like",:id => "like_" + dom_id(object),:method => :delete, :remote => true}
      else
        params << image_tag("star2.png", :class => "menu_icon")
        params << [object, :like]
        params << {:class => "verb_like",:id => "like_" + dom_id(object),:method => :post, :remote => true}
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
