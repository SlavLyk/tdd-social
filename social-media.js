import { v4 as uuidv4 } from 'uuid';

const users = []

function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

function getUserById(userId) {
  return users.find((user) => user.userId === userId);
}

class User {
  userId
  username
  posts
  following

  constructor(username) {
    this.userId = uuidv4();
    this.username = username
    this.posts = []
    this.following = []

    users.push(this)
  }

  post(message) {
    this.posts.push({
      message,
      timestamp: new Date()
    })
  }

  follow(user) {
    // First make sure the user exists
    if (!!getUserById(user.userId)) {
      this.following.push(user.userId)
    }
  }
}

function consoleInput(text) {
  const [username, command, arg] = text.split(' ', 3)

  if (command === '/follow') {
    const user = getUserByUsername(username)
    const userToFollow = getUserByUsername(arg)

    if (!!user && !!userToFollow) {
      user.follow(userToFollow)
      return "User followed"
    }
  }

  if (command === '/post') {
    const user = getUserByUsername(username)
    user.post(arg)
    return "Posted"
  }
}

export { User, consoleInput }