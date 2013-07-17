module ProfilesHelper
  
  #Tells if the current subject accessing the profile is its owner or not
  def is_owner?
    if (current_subject.present?) and (@profile.present?) and (@profile.actor == current_subject.actor)
      return true
    else
      return false
    end
  end
  
  #Returns true if the "Personal Information" section is empty
  def is_personal_empty?
    if (@profile.occupation?) or (@profile.organization?) or (@profile.birthday?) or (@profile.city?) or (@profile.description?)
      return false
    else
      return true
    end
  end
  
  #Returns true if the "Personal Information" section is empty
  def is_contact_empty?
    if (@profile.phone?) or (@profile.mobile?) or (@profile.fax?) or (@profile.address?) or (@profile.website?)
      return false
    else
      return true
    end
  end
  
  #Returns the value if user is signed in or a link to sign in view
  def show_if_signed_in(info)
    return info if user_signed_in?
    return link_to t('profile.must_be_signed_id'), new_user_session_path
  end
  
end
