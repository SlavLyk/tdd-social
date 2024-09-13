import { v4 as uuidv4 } from 'uuid';

const users = []

/**
 * Tries to get a user by the specified username. If none is found, a falsy value is returned.
 * @param {string} username The username for the user to retrieve
 * @returns Returns the user object, or a falsy value if we couldn't find them
 */
function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

/**
 * Tries to get a user by the specified UUID. If none is found, a falsy value is returned.
 * @param {string} userId The UUID for the user to retrieve.
 * @returns Returns the user object, or a falsy value if we couldn't find them
 */
function getUserById(userId) {
  return users.find((user) => user.userId === userId);
}

/**
 * Represents a user in the social media system.
 */
class User {
  /**
   * The user's ID in the system
   * @type {string}
   */
  userId
  /**
   * The user's username
   * @type {string}
   */
  username
  /**
   * The posts the user has made
   * @type {{message: string, timestamp: Date}[]}
   */
  posts
  /**
   * The IDs of the users that this user is following
   * @type {string[]}
   */
  following

  /**
   * Creates a new user with the specified username.
   * @param {string} username The desired username for the user
   */
  constructor(username) {
    this.userId = uuidv4();
    this.username = username
    this.posts = []
    this.following = []

    users.push(this)
  }

  /**
   * Posts a message to the user's timeline
   * @param {string} message The message to post
   * @returns {void}
   */
  post(message) {
    this.posts.push({
      message,
      timestamp: new Date().toShortFormat()
    })
  }

  /**
   * Follows another user by adding their ID to this user's following list
   * @param {User} user The user to follow
   * @returns {void}
   */
  follow(user) {
    // First make sure the user exists
    if (!!getUserById(user.userId)) {
      this.following.push(user.userId)
    }
  }
}

Date.prototype.toShortFormat = function() {

    const monthNames = ["Jan", "Feb", "Mar", "Apr",
                        "May", "Jun", "Jul", "Aug",
                        "Sep", "Oct", "Nov", "Dec"];
    
    const day = this.getDate();
    
    const monthIndex = this.getMonth();
    const monthName = monthNames[monthIndex];
    
    const year = this.getFullYear();
    
    return `${day} ${monthName} ${year}`;  
}  



/**
 * Prints a timeline for the specified users
 * @param {User[]} users The users to print a timeline for
 * @returns {string} The formatted timeline
 */
function printTimeline(users) {
  /**
   * @type {{formattedPost: string, timestamp: Date}[]}
   */
  const allPosts = [];
  for (const user of users) {
    for (const post of user.posts) {
      allPosts.push({
        timestamp: post.timestamp,
        formattedPost: `@${user.username} at ${post.timestamp}\n${post.message}\n\n`
      });
    }
  }

  // Get the posts from all users and order chronologically from newest to oldest
  allPosts.sort((a, b) => a.timestamp - b.timestamp);

  // Format each post into a nice text output
  return allPosts.map(p => p.formattedPost).join('');
}

/**
 * Parses the input from the console and performs the appropriate action
 * @param {string} text The text input from the console
 * @returns {string} The response to the input
 */
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
    let user = getUserByUsername(username)
    if (!user) {
      user = new User(username);
      users.push(user);
    }

    user.post(arg)
    return "Posted"
  }

  if (command === '/timeline') {
    const user = getUserByUsername(arg);
    
  }
}

export { User, printTimeline, consoleInput }