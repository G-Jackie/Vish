#
# You've got to love rake here:
# to patch social_stream's populate.rake, you can name this file anything but populate.rake
#

namespace :db do

  namespace :populate do
    
    # Clear existing tasks
    task(:create_ties).prerequisites.clear
    task(:create_ties).clear
    %w( db:seed create:groups ).each do |t|
      task(:create).prerequisites.delete(t)
    end

    # User 12 logos
    ENV['LOGOS_TOTAL'] = 12.to_s

    desc "Create populate data for ViSH"
    task :create => [ 'create:occupations', 'create:excursions', 'create:current_site', 'create:admin', 'create:demo_user']
    #task :create => [ :read_environment, :create_users, :create_ties, :create_posts, :create_messages, :create_excursions, :create_documents, :create_avatars ]

    namespace :create do
      
      desc "Create Ties as follows and rejects only"
      task :ties do
        puts 'Follows population'
        ties_start = Time.now

        @available_actors.each do |a|
          actors = @available_actors.dup - Array(a)
          relations = [ Relation::Follow.instance, Relation::Reject.instance ]
          break if actors.size==0
          Forgery::Basic.number(:at_most => actors.size).times do
            actor = actors.delete_at((rand * actors.size).to_i)
            contact = a.contact_to!(actor)
            contact.user_author = a.user_author if a.subject_type != "User"
            contact.relation_ids = Array(Forgery::Extensions::Array.new(relations).random.id) unless a==actor
          end
        end

        ties_end = Time.now
        puts '   -> ' +  (ties_end - ties_start).round(4).to_s + 's'
      end

      desc "Assign an occupation to users"
      task :occupations do
        puts 'Occupation population'
        occupations_start = Time.now

        User.all.each do |u|
          u.update_attributes(:occupation => rand(Occupation.size))
        end

        occupations_end = Time.now
        puts '   -> ' +  (occupations_end - occupations_start).round(4).to_s + 's'
      end

      desc "Populate excursions to the database"
      task :excursions do
        puts 'Excursion population'
        excursions_start = Time.now
        @slide_id=0
        @available_actors = Actor.all

        # Some sample science images in the public domain
        @sample_images = %w{
          http://s0.geograph.org.uk/geophotos/01/74/36/1743675_513c1a7a.jpg
          http://i.images.cdn.fotopedia.com/flickr-119671566-hd/Endangered_Species/Least_Concern/Gray_Wolf/Gray_Wolf_Canis_lupus.jpg
          http://lucaskrech.com/blog/wp-content/uploads/2010/07/Screen-shot-2010-07-15-at-9.05.45-PM.png
          http://images.cdn.fotopedia.com/flickr-3417427945-hd.jpg
          http://2.bp.blogspot.com/_QEWhOURarSU/SMesG6Wt0iI/AAAAAAAACZY/3LBoehU1SpQ/s320/lhc.jpg
          http://images.cdn.fotopedia.com/flickr-3507973704-hd.jpg
        }

        def generate_slide
          img_right = rand() > 0.5
          slide_id = "article#{@slide_id+=1}"

          { # Slide N
            :id => slide_id,
            :template => 't1',
            :type => 'standard',
            :elements => [
              { # Element 1
                :type => 'text',
                :id => slide_id + "_zone1",
                :areaid => 'header',
                :body => Forgery::LoremIpsum.words(1+rand(4),:random => true)
              },
              { # Element 2
                :type => ( img_right ? 'image' : 'text' ),
                :id => slide_id + "_zone2",
                :areaid => 'right',
                :body => ( img_right ? @sample_images[rand(@sample_images.size)] : Forgery::LoremIpsum.paragraph(:random => true) )
              },
              { # Element 3
                :type => ( img_right ? 'text' : 'image' ),
                :id => slide_id + "_zone3",
                :areaid => 'left',
                :body => ( img_right ? Forgery::LoremIpsum.paragraph(:random => true) : @sample_images[rand(@sample_images.size)] )
              }
            ]
          }
        end

        500.times do
          updated = Time.at(rand(Time.now.to_i))
          author = @available_actors[rand(@available_actors.size)]
          owner  = author
          user_author =  ( author.subject_type == "User" ? author : author.user_author )

          if user_author == nil
            user_author = author
          end

          e = Excursion.create! :json => {  :title => "kike#{Forgery::LoremIpsum.words(1+rand(4),:random => true)}",
                                            :description => "#{Forgery::LoremIpsum.paragraph(:random => true)}",
                                            :author => author.name,
                                            :avatar => @sample_images[rand(@sample_images.size)],
                                            :slides => Array.new(1+rand(9)).map{ generate_slide }
                                         }.to_json,
                                :created_at => Time.at(rand(updated.to_i)),
                                :updated_at => updated,
                                :author_id  => author.id,
                                :owner_id   => owner.id,
                                :user_author_id => user_author.id,
                                :relation_ids => [Relation::Public.instance.id],
				                        :tag_list => ["Maths","Physics","Chemistry","Geography","Biology","ComputerScience","EnvironmentalStudies","Engineering","Humanities","NaturalScience"].sample(2).join(",")
          e.save!
        end

        #create one draft per actor
        @available_actors.each do |a|
          updated = Time.at(rand(Time.now.to_i))
          author = a
          owner  = author
          user_author =  ( author.subject_type == "User" ? author : author.user_author )

          if user_author ==nil
            user_author = author
          end

          e = Excursion.create! :json => {  :title => "#{Forgery::LoremIpsum.words(1+rand(4),:random => true)}",
                                            :description => "Description: #{Forgery::LoremIpsum.paragraph(:random => true)}",
                                            :author => author.name,
                                            :avatar => @sample_images[rand(@sample_images.size)],
                                            :slides => Array.new(1+rand(9)).map{ generate_slide }
                                         }.to_json,
                                :created_at => Time.at(rand(updated.to_i)),
                                :updated_at => updated,
                                :author_id  => author.id,
                                :owner_id   => owner.id,
                                :user_author_id => user_author.id,
                                :relation_ids => [Relation::Public.instance.id],
                                :draft => true
          e.save!
        end

        excursions_end = Time.now
        puts '   -> ' +  (excursions_end - excursions_start).round(4).to_s + 's'
      end

      desc "Create excursion comments"
      task :comments do
        puts 'Excursion comments population'
        comments_start = Time.now

        def fake_comment(activity)
          Comment.new(:owner_id => Actor.normalize_id(activity.receiver), :_activity_parent_id => activity.id, :text => "Hola")
        end

        Excursion.all.each do |e|
          fake_comment(e.post_activity)
        end

        comments_end = Time.now
        puts '   -> ' +  (comments_end - comments_start).round(4).to_s + 's'
      end

      desc "Create current site"
      task :current_site do
        puts 'Current site population'
        current_site_start = Time.now

        Site.current.name = "ViSH"
        Site.current.email = Vish::Application.config.APP_CONFIG["main_mail"]
        Site.current.relation_ids = [Relation::Private.instance.id]
        Site.current.activity_object.relation_ids = [Relation::Private.instance.id]
        Site.current.actor!.update_attribute :slug, 'vish'
        Site.current.config["tmpCounter"] = 1
        Site.current.save!

        current_site_end = Time.now
        puts '   -> ' +  (current_site_end - current_site_start).round(4).to_s + 's'
      end

      #Usage
      #Development:   bundle exec rake db:create:admin
      #In production: bundle exec rake db:create:admin RAILS_ENV=production
      desc "Create ViSH Admin"
      task :admin => :environment do
        puts 'Creating admin user'

          # Create admin user if not present
          admin = User.find_by_slug('admin')
          if admin.blank?
            admin = User.new
          end

          # If present, ensure that has the appropiate data
          admin.name = 'ViSH Admin'
          admin.email = 'admin@vishub.org'
          admin.password = 'demonstration'
          admin.password_confirmation = admin.password
           #prevent Admin to be indexed by the search engine
          admin.relation_ids = [Relation::Private.instance.id]
          admin.activity_object.relation_ids = admin.relation_ids
          admin.save(:validate => false)
          admin.actor!.update_attribute :slug, 'admin'

          #Make Demo ViSH admin
          admin.actor!.update_attribute :is_admin, true

          #Make Demo admin 'in the Social Stream way'
          contact = Site.current.contact_to!(admin.actor)
          contact.user_author = admin
          contact.relation_ids = [ Relation::LocalAdmin.instance.id ]
          contact.save!

          puts "Admin created with email: " + admin.email + " and password: " + admin.password
      end

      #Usage
      #Development:   bundle exec rake db:create:demo_user
      #In production: bundle exec rake db:create:demo_user RAILS_ENV=production
      desc "Create ViSH demo user"
      task :demo_user => :environment do
        puts 'Creating demo user'

          # Create demo user if not present
          demo = User.find_by_slug('demo')
          if demo.blank?
            demo = User.new
          end

          # If present, ensure that has the appropiate data
          demo.name = 'Demo'
          demo.email = 'demo@vishub.org'
          demo.password = 'demonstration'
          demo.password_confirmation = demo.password
          demo.save(:validate => false)
          demo.actor!.update_attribute :slug, 'demo'
          demo.actor!.update_attribute :is_admin, false

          puts "Demo user created with email: " + demo.email + " and password: " + demo.password
      end
    end
  end

  #Usage
  #Development:   bundle exec rake db:anonymize
  #In production: bundle exec rake db:anonymize RAILS_ENV=production
  desc "Anonymize database for delivering"
  task :anonymize => :environment do
    printTitle("Anonymizing database")

    User.record_timestamps=false
    Actor.record_timestamps=false
    Profile.record_timestamps=false
    Comment.record_timestamps=false
    ActivityObject.record_timestamps=false


    User.all.each do |u|
      u.name = Faker::Name.name[0,30]
      u.email = "noreply" + u.id.to_s + "@example.com" #(Include u.id to create a uniq email)
      u.password = "demonstration"
      u.slug = u.name.to_url #Create slug using stringex gem
      unless User.find_by_slug(u.slug).nil?
        u.slug = u.slug + "-" + u.id.to_s
      end
      u.current_sign_in_ip = nil
      u.last_sign_in_ip = nil
      u.logo = nil
      u.save(:validate => false)

      #User profile
      up = u.profile
      unless up.description.nil?
        up.description = Faker::Lorem.sentence(20, true)
      end
      unless up.organization.nil?
        up.organization = Faker::Company.name[0,30]
      end
      unless up.city.nil?
        up.city = Faker::Address.city[0,30]
      end
      unless up.country.nil?
        up.country = Faker::Address.country[0,30]
      end
      unless up.website.nil?
        up.website = Faker::Internet.url[0,30]
      end
      
      up.birthday = nil
      up.phone = nil
      up.mobile = nil
      up.fax = nil
      up.address = nil
      up.zipcode = nil
      up.province = nil
      up.prefix_key = nil
      up.experience = nil
      up.skype = nil

      up.save(:validate => false)
    end

    #Create demo user
    user = User.all.select{|u| Excursion.authored_by(u).length>0 && u.follower_count>0}.sort{|ub,ua| ua.ranking<=>ub.ranking}.first
    if user.nil?
      user = User.all.sample
    end

    unless user.nil?
      user.name = Faker::Name.name[0,30]
      user.email = "demo@vishub.org"
      user.password = "demonstration"
      user.slug = user.name.to_url
      user.save(:validate => false)
      printTitle("Demo user created with email: 'demo@vishub.org' and password 'demonstration'.")
    end

    #Removing private messages
    Receipt.delete_all
    Notification.delete_all
    Conversation.delete_all
    Message.delete_all

    #Removing QuizSession results
    QuizSession.delete_all
    QuizAnswer.delete_all

    #Removing Tracking System data
    TrackingSystemEntry.delete_all

    #Anonymizing comments
    Comment.all.each do |c|
      c.activity_object.update_column :description, Faker::Lorem.sentence(20, true)
    end

    #Updating excursion authors
    Rake::Task["fix:authors"].invoke

    User.record_timestamps=true
    Actor.record_timestamps=true
    Profile.record_timestamps=true
    Comment.record_timestamps=true
    ActivityObject.record_timestamps=true

    printTitle("Task Finished")
  end

end

