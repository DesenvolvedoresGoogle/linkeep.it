# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Link.create(
  [{
    name: 'Bootstrap Sass (github)', 
    url: 'https://github.com/twbs/bootstrap-sass'
  },
  {
    name: 'Treebook (github)', 
    url: 'https://github.com/robthefrog/treebook'
  },
  {
    name: 'A Rule of thumb for Strong Parameters', 
    url: 'http://patshaughnessy.net/2014/6/16/a-rule-of-thumb-for-strong-parameters'
  },
  {
    name: 'Rails Testing for Zombies', 
    url: 'https://www.codeschool.com/courses/rails-testing-for-zombies'
  },
  {
    name: 'Bootstrap',
    url: 'http://getbootstrap.com/css/'
  }]
)

