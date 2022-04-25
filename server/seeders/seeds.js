const faker = require("faker");

const db = require("../config/connection");
const { Post, User, Group, Interest } = require("../models");

db.once("open", async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
  await Group.deleteMany({});
  await Interest.deleteMany({});

  const interestData = [
    { name: "Outdoors" },
    { name: "Arts and Crafts" },
    { name: "Social" },
    { name: "Service" },
    { name: "Health and Wellness" },
  ];
  // create interest data
  const interests = await Interest.insertMany(interestData); //???
  console.log("interests seeded");

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);
  console.log("users seeded");
  // create groups
  const groupData = [];
  for (let i = 0; i < 10; i++) {
    const name = faker.name.firstName();
    const description = faker.lorem.paragraph(); // not sure about this?
    groupData.push({ name, description });
   const group = await Group.create(groupData[i])
    await Interest.updateOne(
      { name: interestData[i].name },
      { $addToSet: { groups: {_id: group._id} } }
    );
  }
  const createdGroups = await Group.collection.insertMany(groupData);
  console.log("groups seeded");
  // create members for groups
  for (let i = 0; i < 50; i += 1) {
    const randomGroupIndex = Math.floor(Math.random() * createdGroups.ops.length);
    const { _id: groupId } = createdGroups.ops[randomGroupIndex];
  }
  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }
  console.log("friends seeded");
  // create posts
  let createdPosts = [];
  for (let i = 0; i < 100; i += 1) {
    const postText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdPost = await Post.create({ postText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { posts: createdPost._id } }
    );
    const updatedGroup = await Group.updateOne(
      { _id: groupId }, // ?????
      { $push: { posts: createdPost._id } }
    );

    createdPosts.push(createdPost);
  }
  console.log("posts seeded");
  console.log("all done!");
  process.exit(0);
});
