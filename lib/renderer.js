const { join } = require('path')
const fs = require('fs')

const render = posts => {
  const html = []
  html.push(posts.map(post => renderPost(post)))
  return renderMain(html.join(''))
}

const renderPost = post => {
  let template = fs.readFileSync(join(__dirname, '..', 'templates', 'post.html'), 'utf8')
  template = replacePlaceholders(template, 'title', post.getTitle())
  template = replacePlaceholders(template, 'body', post.getBody())
  return template
}

const renderMain = html => {
  const template = fs.readFileSync(join(__dirname, '..', 'templates', 'main.html'), 'utf8')
  return replacePlaceholders(template, 'main', html)
}

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp(`{{ ${placeholder} }}`, 'gm')
  return template.replace(pattern, value)
}

module.exports = render
