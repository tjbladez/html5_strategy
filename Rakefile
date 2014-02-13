require 'rake'
require 'rake/testtask'
require 'pathname'

task default: :deploy

desc "Deployment"
task :deploy do
  game_path = Pathname.new('.')
  puts "Creating a game file..."
  system ". #{game_path.realpath}/tools/bake.sh"
  system "git push heroku master"
end
