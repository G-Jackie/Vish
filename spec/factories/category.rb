Factory.define :category do |cat|
  cat.sequence(:title) { |n| "Kik #{ n }" }
  cat.author {|author| author.association(:user_vish, :name => 'Writely') }
  cat.owner {|author| author.association(:user_vish, :name => 'Writely') }

end