#
# You've got to love rake here:
# to patch social_stream's populate.rake, you can name this file anything but populate.rake
#

namespace :db do
  namespace :populate do
    # Clear existing tasks
    task(:create).prerequisites.clear
    task(:create).clear
    task(:create_ties).prerequisites.clear
    task(:create_ties).clear

    # User 12 logos
    ENV['LOGOS_TOTAL'] = 12.to_s

    desc "Create populate data for ViSH"
    task :create => [ :read_environment, :create_users, :create_ties, :create_posts, :create_messages, :create_excursions, :create_documents, :create_avatars ]

    desc "Create Ties as follows and rejects only"
    task :create_ties do
      puts 'Follows population'
      ties_start = Time.now

      @available_actors.each do |a|
        actors = @available_actors.dup - Array(a)
        relations = [ Relation::Follow.instance, Relation::Reject.instance ]
        break if actors.size==0
        Forgery::Basic.number(:at_most => actors.size).times do
          actor = actors.delete_at((rand * actors.size).to_i)
          contact = a.contact_to!(actor)
          contact.relation_ids = Array(Forgery::Extensions::Array.new(relations).random.id) unless a==actor
        end
      end

      ties_end = Time.now
      puts '   -> ' +  (ties_end - ties_start).round(4).to_s + 's'
    end

    desc "Populate excursions to the database"
    task :create_excursions do
      puts 'Excursion population'
      excursions_start = Time.now
      @slide_id=0

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
        { # Slide N
          :id => "vish#{@slide_id+=1}",
          :template => 't1',
          :elements => [
            { # Element 1
              :type => 'text',
              :areaid => 'header',
              :body => Forgery::LoremIpsum.words(1+rand(4),:random => true)
            },
            { # Element 2
              :type => ( img_right ? 'image' : 'text' ),
              :areaid => 'right',
              :body => ( img_right ? @sample_images[rand(@sample_images.size)] : Forgery::LoremIpsum.paragraph(:random => true) )
            },
            { # Element 3
              :type => ( img_right ? 'text' : 'image' ),
              :areaid => 'left',
              :body => ( img_right ? Forgery::LoremIpsum.paragraph(:random => true) : @sample_images[rand(@sample_images.size)] )
            }
          ]
        }
      end

      50.times do
        updated = Time.at(rand(Time.now.to_i))
        author = @available_actors[rand(@available_actors.size)]
        owner  = author
        user_author =  ( author.subject_type == "User" ? author : author.user_author )

        e = Excursion.create! :json => {  :title => "#{Forgery::LoremIpsum.words(1+rand(4),:random => true)}",
                                          :description => "Description: #{Forgery::LoremIpsum.paragraph(:random => true)}",
                                          :author => author.name,
                                          :slides => Array.new(1+rand(9)).map{ generate_slide }
                                       }.to_json,
                              :created_at => Time.at(rand(updated.to_i)),
                              :updated_at => updated,
                              :author_id  => author.id,
                              :owner_id   => owner.id,
                              :user_author_id => user_author.id,
                              :relation_ids => [Relation::Public.instance.id]
        e.save!
      end

      excursions_end = Time.now
      puts '   -> ' +  (excursions_end - excursions_start).round(4).to_s + 's'
    end

  end
end

