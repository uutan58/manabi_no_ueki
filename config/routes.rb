Rails.application.routes.draw do
  devise_for :users
  root "staticpages#top"

  get "top/index"
  resources :schedules
  get "up" => "rails/health#show", as: :rails_health_check

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
