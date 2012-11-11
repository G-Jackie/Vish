Vish::Application.routes.draw do
  devise_for :users, :controllers => {:omniauth_callbacks => 'omniauth_callbacks'}

  # Blatant redirections
  match '/users/:id/links' => redirect('/users/%{id}/documents')
  match '/users/:id/embeds' => redirect('/users/%{id}/documents')
  match '/users/:id/contacts' => redirect('/users/%{id}/followings')

  # Explore
  match '/explore' => 'frontpage#explore'

  # Live Session
  resource :live_session

  # Offline
  match '/offline' => 'frontpage#offline'
  match '/offline/manifest' => 'frontpage#manifest'

  # Match the filter before the individual resources
  match 'excursions/search' => 'excursions#search'

  match 'excursions/preview' => 'excursions#preview'

  match 'excursions/:id/clone' => 'excursions#clone'

  match '/excursions/:id/manifest' => 'excursions#manifest'

  match '/excursions/:id.mashme' => 'excursions#show', :defaults => { :format => "gateway", :gateway => 'mashme' }

  resources :excursions
  resources :slides
  resources :embeds
  resources :swfs
  resources :officedocs
  SocialStream.subjects.each do |actor|
    resources actor.to_s.pluralize do
      resources :swfs
      resources :officedocs
    end
  end

  match 'embeds/:id/modal' => 'modals#embed'
  match 'links/:id/modal' => 'modals#link'
  match 'officedocs/:id/modal' => 'modals#officedoc'
  match 'audios/:id/modal' => 'modals#audio'
  match 'videos/:id/modal' => 'modals#video'
  match 'documents/:id/modal' => 'modals#document'
  match 'pictures/:id/modal' => 'modals#picture'
  match 'swfs/:id/modal' => 'modals#swf'

  resources :quiz_sessions do
    get "results", :on => :member
  end

  match 'resources/search' => 'resources#search'

  match 'followers/search' => 'followers#search_followers'
  match 'followings/search' => 'followers#search_followings'

  SocialStream.subjects.each do |actor|
    resources actor.to_s.pluralize do
      match 'followings' => 'followers#index', :as => :followings, :defaults => { :direction => 'sent' }
      match 'followers' => 'followers#index', :as => :followers, :defaults => { :direction => 'received' }
      match 'modal' => 'modals#actor'
      match 'live' => 'live_sessions#actor'
    end
  end

  resource :session_locale

  match 'legal_notice' => 'legal_notice#index'

  match 'mashme_invite' => 'mashme_invites#invite'

  match 'help' => 'help#index'

  # Add this at the end so other URLs take prio
  match '/s/:id' => "shortener/shortened_urls#show"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
