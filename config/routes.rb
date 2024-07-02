Rails.application.routes.draw do
  devise_for :users

  # ログイン前のHOME画面
  unauthenticated do
    root "staticpages#index"
  end

  # ログイン後のTOP画面
  authenticated :user do
    root "top#index", as: :authenticated_root
  end

  get "top/index"
  resources :schedules, only: [:index, :create, :update, :destroy]
  get "up" => "rails/health#show", as: :rails_health_check

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
