import { consoleInput, User } from "./social-media";

describe("User object", () => {
  test("constructor generates user id", () => {
    expect(new User("winners").username).not.toBe('');
  });

  test("user can post", () => {
    const user = new User("winners");
    user.post("Hello, World!");
      
    expect(user.posts).not.toHaveLength(0);
  });

  test("user can follow", () => {
    const user = new User("winner");
    const user2 = new User("winner2");

    user.follow(user2)
    expect(user.following).not.toHaveLength(0);
  });
});

describe("console input", () => {
  test("user follows another user", () => {
    const result = consoleInput("winner /follow winner2")
  })
})