class License < ActiveRecord::Base
  has_many :activity_objects

  validates :key, :presence => true, :uniqueness => true


  ###########
  # Methods
  ###########

  def public?
    !self.private?
  end

  def private?
    self.key === "private"
  end

  def name
    I18n.t('licenses.' + self.key.to_s)
  end

end