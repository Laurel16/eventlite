Rails.application.config.middleware.insert_before0,Rack::Corsdo allow do
    origins 'http://localhost:3000'
    resource '*',
    headers: :any,
    methods: [:get, :post, :patch, :put, :delete]
  end
end

