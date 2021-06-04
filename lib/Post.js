class Post {
  constructor (title, body) {
    this.title = title
    this.body = body
  }

  getTitle () {
    return this.title
  }

  getBody () {
    return this.body
  }
}

module.exports = Post
