require 'rake'
require 'rake/testtask'
require 'pathname'

task default: :deploy

desc "Deployment"
task :deploy do
  game_path = Pathname.new('.')
  blog_path = game_path + '../html5_strategy_blog'
  puts "Deplying..."
  system "cp -fr #{blog_path.realpath}/_site/ #{game_path.realpath}/"
end
