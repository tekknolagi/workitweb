require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    resource '/', :headers => :any, :methods => [:post, :get]
    resource '*', :headers => :any, :methods => [:post, :get]
    resource '/*', :headers => :any, :methods => [:post, :get]
  end
end

use Rack::Static,
  :urls => ["/assets", "/templates"],
  :root => ".",
  :index => 'index.html'

run Rack::File.new(".")
