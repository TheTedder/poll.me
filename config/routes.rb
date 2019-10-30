Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/new', to: 'homes#index'
  get '/', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :polls, only: [:create, :show]
    end
  end
end
