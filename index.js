const render = require('./lib/renderer.js')
const { prompt } = require('inquirer')
const Post = require('./lib/Post.js')
const { join } = require('path')
const fs = require('fs')
const posts = []

const createPosts = () => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the post?'
    },
    {
      type: 'input',
      name: 'body',
      message: 'What is the body of the post?'
    }
  ])
    .then(({ title, body }) => {
      posts.push(new Post(title, body))
      prompt({
        type: 'confirm',
        name: 'cont',
        message: 'Continue?'
      })
        .then(({ cont }) => {
          if (cont) {
            createPosts()
          } else {
            fs.writeFile(join(__dirname, 'output', 'index.html'), render(posts), err => {
              if (err) { console.log(err) }
              console.log('HTML Generated!')
            })
          }
        })
    })
    .catch(err => console.log(err))
}

createPosts()
