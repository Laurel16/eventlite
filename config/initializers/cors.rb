Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://events-react-front.herokuapp.com'
    resource '*',
    headers: :any,
    expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
    methods: [:get, :post, :patch, :put, :delete]
 end
end

