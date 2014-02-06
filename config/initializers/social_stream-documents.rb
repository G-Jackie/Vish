SocialStream::Documents.setup do |config| 
#  Configure picture thumbnails
  
  config.picture_styles = {
    :"170x127#" => ["170x127#"],
    # this one preserves A4 proportion: 210x297
    :"80x113#" => ["80x113#"],
    :"500" => ["500>"]
   }

#  Configure audio thumbnails
  
  config.audio_styles = {
     webma: {
       format: 'webm',
       processors: [ :ffmpeg]
     },
     mp3: {
      format: 'mp3',
      processors: [ :ffmpeg]
     },
     wav: {
      format: 'wav',
      processors: [ :ffmpeg]
     }

     # You need to add the `paperclip_waveform` gem to your Gemfile
     # to get pngs with the audio wave form
     # waveform: {
     #   format: :png,
     #   convert_options: {
     #     color: :transparent,
     #     background_color: '#333333',
     #     width: 460,
     #     height: 75
     #   },
     #   processors: [ :waveform ]
     # }
  }

#  Configure video thumbnails
  
   config.video_styles = {
     :webm => { :format => 'webm' },
     :flv  => { :format => 'flv',
                :convert_options => { :output => {:ar =>'22050'}}
              }, 
     :mp4  => { :format => 'mp4',:convert_options => { :output => {:vcodec =>'libx264', :acodec =>"aac", :strict => "-2"}}, :streaming => true},
     :"170x127#" => { :geometry => "170x127#", :format => 'png', :time => 4 }
   }

#  List of mime types that have an icon defined
  # config.icon_mime_types  = {
  #    default: :default,
  #    types: [
  #      :text, :image, :audio, :video
  #    ],
  #    subtypes: [
  #      :txt, :ps, :pdf, :sla, 
  #      :odt, :odp, :ods, :doc, :ppt, :xls, :rtf,
  #      :rar, :zip,
  #      :jpeg, :gif, :png, :bmp, :xcf,
  #      :wav, :ogg, :webma, :mpeg,
  #      :flv, :webm, :mp4
  #    ]
  #  }

  config.icon_mime_types  = {
    default: :default,
    types: [
      :text, :image, :audio, :video
    ],
    subtypes: []
  }

  config.subtype_classes_mime_types[:officedoc]= [:odt, :odp, :ods, :doc, :ppt, :xls, :rtf, :pdf]
  config.subtype_classes_mime_types[:video] = [ :flv, :webm, :mp4, :mpeg, :mov, :wmv, :m4v, :ogv, :gpp, :gpp2 ]
  config.subtype_classes_mime_types[:audio] = [ :aac, :gppa, :gpa, :wav, :ogg, :webma, :mp3 ]
  config.subtype_classes_mime_types[:swf] = [:swf]
end
