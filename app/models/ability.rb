class Ability
  include SocialStream::Ability

  def initialize(subject)
    
    if !subject.nil? and subject.is_admin
      can :manage, :all
    end

    can :show_favorites, Category
    can :excursions, User
    can :resources, User
    can :events, User
    can :categories, User
    can :followers, User
    can :followings, User

    super
  end
end
