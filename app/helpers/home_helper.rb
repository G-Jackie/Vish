module HomeHelper
  def current_subject_excursions(options = {})
    subject_excursions current_subject, options
  end

  # Excursions can be search in several scopes:
  # * :me   just the subject
  # * :net  subject and followings
  # * :more everybody except subject and followings
  def subject_excursions(subject, options = {})
    subject_content subject, Excursion, options
  end

  def current_subject_documents(options = {})
    subject_documents current_subject, options
  end

  def subject_documents(subject, options = {})
    subject_content subject, Document, options
  end

  def current_subject_links(options = {})
    subject_links current_subject, options
  end

  def subject_links(subject, options = {})
    subject_content subject, Link, options
  end

  def current_subject_resources(options = {})
    subject_resources current_subject, options
  end

  def subject_resources(subject, options = {})
    subject_content subject, [Document, Embed], options
  end

  def subject_content(subject, klass, options = {})
    options[:limit] ||= 4
    options[:scope] ||= :net

    following_ids = subject.following_actor_ids
    following_ids |= [ subject.actor_id ]

    query = klass
    query = ActivityObject.where(:object_type => klass.map{|t| t.to_s}) if klass.is_a?(Array)

    case options[:scope]
    when :me
      query = query.authored_by(subject.actor_id)
    when :net
      query = query.authored_by(following_ids)
    when :more
      query = query.not_authored_by(following_ids)
    end

    query = query.order('updated_at DESC')
    query = query.first(options[:limit]) if options[:limit] > 0

    return query.map{|ao| ao.object} if klass.is_a?(Array)
    query
  end
end
