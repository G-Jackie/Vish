# Copyright 2011-2012 Universidad Politécnica de Madrid and Agora Systems S.A.
#
# This file is part of ViSH (Virtual Science Hub).
#
# ViSH is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# ViSH is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with ViSH.  If not, see <http://www.gnu.org/licenses/>.

class Contribution < ActiveRecord::Base
  belongs_to :activity_object
  belongs_to :wa_assignment

  #belongs_to  :parent, :class_name => 'Contribution'
  #has_many 	:children, :class_name => 'Contribution', :foreign_key => 'parent_id'
  	
  def workshop
    self.wa_assignment.workshop_activity.workshop
  end

end
