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
require 'builder'

class Excursion < ActiveRecord::Base
  include SocialStream::Models::Object

  has_many :quizzes, :dependent => :destroy

  has_many :excursion_contributors, :dependent => :destroy
  has_many :contributors, :class_name => "Actor", :through => :excursion_contributors

  validates_presence_of :json
  after_save :parse_for_meta
  before_save :fix_relation_ids_drafts
  after_destroy :remove_scorm

  define_index do
    activity_object_index

    indexes excursion_type
    has slide_count
    has draft
    has activity_object.like_count, :as => :like_count
    has activity_object.visit_count, :as => :visit_count
  end

  def to_json(options=nil)
    json
  end


  def to_scorm(controller)
    if self.scorm_needs_generate
      require 'zip/zip'
      require 'zip/zipfilesystem'  
      t = File.open("#{Rails.root}/public/scorm/excursions/#{self.id}.zip", 'w')
      Zip::ZipOutputStream.open(t.path) do |zos|
        xml_manifest = self.generate_scorm_manifest
        zos.put_next_entry("imsmanifest.xml")
        zos.print xml_manifest.target!()

        zos.put_next_entry("excursion.html")
        zos.print controller.render_to_string "show.embed.erb", :locals => {:excursion=>self}, :layout => false  

        self.scorm_timestamp = Time.now
        self.save!
      end    
      t.close
    end
  end

  def scorm_needs_generate
    if self.scorm_timestamp.nil? or self.updated_at > self.scorm_timestamp
      return true;
    else
      return false;
    end
  end

  def generate_scorm_manifest
    myxml = ::Builder::XmlMarkup.new(:indent => 2)
    myxml.instruct! :xml, :version => "1.0", :encoding => "UTF-8"
    myxml.manifest('xsi:schemaLocation'=>"http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd", 'identifier'=>"MANIFEST-A2F3004F6186AC9480285D4AEDCD6BAF", 'xmlns:adlcp'=>"http://www.adlnet.org/xsd/adlcp_rootv1p2", 'xmlns:xsi'=>"http://www.w3.org/2001/XMLSchema-instance", 'xmlns:imsmd'=>"http://www.imsglobal.org/xsd/imsmd_rootv1p2p1", 'xmlns'=>"http://www.imsproject.org/xsd/imscp_rootv1p1p2") do
      myxml.organizations('default'=>"ITEM") do       
        
      end
      myxml.resources do         
        myxml.resource('identifier'=>"RES-" + self.id.to_s, 'type'=>"webcontent", 'href'=>"excursion.html", 'adlcp:scormtype'=>"sco") do
          myxml.file('href'=> "excursion.html")
        end
      end       
    end    
    return myxml 
  end

  def remove_scorm
    if File.exist?("#{Rails.root}/public/scorm/excursions/#{self.id}.zip")
      File.delete("#{Rails.root}/public/scorm/excursions/#{self.id}.zip") 
    end
  end

  def clone_for sbj
    return nil if sbj.blank?
    e=Excursion.new
    e.author=sbj
    e.owner=sbj
    e.user_author=sbj.user.actor
    e.json=self.quizless_json # We do this so quizzes are re-created upon cloning.
    e.contributors=self.contributors.push(self.author)
    e.contributors.uniq!
    e.contributors.delete(sbj)
    e.draft=true
    e.save!
    e
  end

  def has_quizzes?
    not quizzes.empty?
  end

  def has_quiz_results?
    has_quizzes? # TODO: Hide unless there are answers
  end

  def quizless_json
    parsed_json = JSON(json)
    parsed_json["slides"].each do |slide|
      slide.delete("quiz_id")
    end
    parsed_json.to_json
  end

  private

  def extract_quizzes(parsed_json)
    return if parsed_json["slides"].nil?
    parsed_json["slides"].each do |slide|
      next if slide["elements"].nil?

      slide["elements"].each do |element| 
        next if element["type"].nil?
        next unless element["type"] == "quiz"
       
        if element["quiz_id"] == ""
          quiz = Quiz.new
        else
          quiz = Quiz.find(element["quiz_id"])
        end
        quiz.excursion=self
        case element["quiztype"]
          when "open" # Open question
            quiz.type="OpenQuiz"
            # PENDING
          when "multiplechoice" # Multiple-choice
           # puts "multiplechoice type detected"
            quiz.type="MultipleChoiceQuiz"
            quiz.question = element["question"] 
            quiz.options  = element["options"].to_json
          when "truefalse" # True/False
            quiz.type="TrueFalseQuiz"
             quiz.question = element["question"] 
             quiz.options  = element["options"].to_json
            # PENDING
        end
        quiz.simple_json = element["quiz_simple_json"].to_json
        quiz.save!
        element["quiz_id"]=quiz.id
      end
    end
    parsed_json
  end

  def parse_for_meta
    parsed_json = JSON(json)
    activity_object.title = parsed_json["title"]
    activity_object.description = parsed_json["description"]
    activity_object.tag_list = parsed_json["tags"]
    activity_object.save!

    parsed_json["id"] = activity_object.id.to_s
    parsed_json["author"] = author.name
    parsed_json = extract_quizzes(parsed_json) # Fill up quiz_id parameters
    self.update_column :json, parsed_json.to_json

    self.update_column :excursion_type, parsed_json["type"]
    self.update_column :slide_count, parsed_json["slides"].size
    self.update_column :thumbnail_url, parsed_json["avatar"]

  end

  def fix_relation_ids_drafts
    if draft
      activity_object.relation_ids=[Relation::Private.instance.id]
    else
      activity_object.relation_ids=[Relation::Public.instance.id]
    end
  end

end
