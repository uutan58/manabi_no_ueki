Rails.application.routes.draw do
  devise_for :users

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

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end