import { consoleInput, User, printTimeline } from "./social-media";

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

describe("Timeline object", () => {
  test("prints single user's timeline", () => {
    const user = new User("winner");
    user.post("Hello, World!");
    user.post("I am the second post");

    const result = printTimeline([user]);

    expect(result).toMatch(
      "@winner at d{1,2} [A-Za-z]+ d{4}, d{1,2}:d{2}sHello, World!s{2}@winner at d{1,2} [A-Za-z]+ d{4}, d{1,2}:d{2}sI am the second post"
    );
  })
})

@winner at 7 Aug 2024, 10:14
Hello, World!

@winner at 9 Aug 2025, 10:10
I am the second post


@winner at Fri Sep 13 2024 16:45:33 GMT+0200 (South Africa Standard Time)
Hello, World!·
@winner at Fri Sep 13 2024 16:45:33 GMT+0200 (South Africa Standard Time)
I am the second post·