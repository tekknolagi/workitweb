use Rack::Static,
  :urls => ["/assets", "/templates"],
  :root => ".",
  :index => 'index.html'

run Rack::File.new(".")
