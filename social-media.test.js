import { consoleInput, User, printTimeline } from "./social-media";

const sleep = (t) => new Promise(r => setTimeout(r, t));

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

describe("Timeline object", () => {
  test("prints single user's timeline", async () => {
    const user = new User("winner");
    user.post("Hello, World!");
    await sleep(100);

    user.post("I am the second post");

    const result = printTimeline([user]);

    console.log(result)

    expect(result).toMatch(
      /@winner at \d{1,2} [A-Za-z]+ \d{4}, \d{2}:\d{2}\sI am the second post\s{2}@winner at \d{1,2} [A-Za-z]+ \d{4}, \d{2}:\d{2}\sHello, World!/
    );
  })

  test("prints multiple users' timelines", async () => {
    const user1 = new User("ivan");
    const user2 = new User("slav");

    user1.post("This is an exciting day!");
    await sleep(100);

    user2.post("We managed to get our social network working!");
    await sleep(100);

    user1.post("What a wow!");

    const result = printTimeline([user1, user2]);

    expect(result).toMatch(
      /@ivan at \d{1,2} [A-Za-z]+ \d{4}, \d{2}:\d{2}\sWhat a wow!\s{2}@slav at \d{1,2} [A-Za-z]+ \d{4}, \d{2}:\d{2}\sWe managed to get our social network working!\s{2}@ivan at \d{1,2} [A-Za-z]+ \d{4}, \d{2}:\d{2}\sThis is an exciting day!/
    );
  })
})

describe("console input", () => {
  test("user follows another user", () => {
    // Post to create the two users
    consoleInput("winner /post Hello, World!");
    consoleInput("winner2 /post Hi there");

    const result = consoleInput("winner /follow winner2");
    expect(result).toBe("User followed");
  });
});