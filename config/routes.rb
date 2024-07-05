Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  resources :contacts, only: [:new, :create]

  unauthenticated do
    root "staticpages#index"
  end

  authenticated :user do
    root "top#index", as: :authenticated_root
  end

  get 'mypage', to: 'my_pages#show'
  resources :users, only: [:show, :edit, :update] do
    resource :profile, only: [:edit, :update]
  end

  get "top/index"
  resources :schedules, only: [:index, :create, :update, :destroy]
  get "up" => "rails/health#show", as: :rails_health_check

  resources :tasks

  resources :study_time_records, only: [:index, :new, :create, :destroy] do
    collection do
      get 'refresh'
    end
  end

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
