Rails.application.routes.draw do

  get 'averages/create'

  get 'averages/update'

  root 'static_pages#home'

  # Static pages routes
  get 'help' => 'static_pages#help'
  get 'about' => 'static_pages#about'
  get 'contact' => 'static_pages#contact'
  
  # Omniauth Routes
  get '/stackoverflow' => 'stack_users#new', :as => :stackoverflow
  get '/twitter' => 'twitter_users#new', :as => :twitter
  
  # Omniauth CallBack Routes
  get '/auth/stackexchange/callback', to: 'stack_users#create'
  get '/auth/github/callback', to: 'sessions#create'
  get '/auth/twitter/callback', to: 'twitter_users#create'

  # Omniauth Authentication Errors Routes
  get '/auth/failure', to: 'sessions#failure'

  # Session and Users routes
  get '/signin' => 'sessions#new', :as => :signin
  get '/logout', to: 'users#logout', :as => :logout
  get 'users/index'
  get 'users/show'
  get 'profile', to: 'users#profile', :as => :profile

end
