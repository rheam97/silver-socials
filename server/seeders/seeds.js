const faker = require("faker");

const db = require("../config/connection");
const { Post, User, Group, Interest } = require("../models");

db.once("open", async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
  await Group.deleteMany({});
  await Interest.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);
  console.log("users seeded");

  // create posts
  let createdPosts = [];
  for (let i = 0; i < 10; i += 1) {
    const postText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    // const randomUserIndex = Math.floor(createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[i];
    // const randomGroupIndex = Math.floor(
    //   Math.random() * createdGroups.ops.length
    // );
    // const { _id: groupId } = createdGroups.ops[randomGroupIndex];

    const createdPost = await Post.create({ postText, username });

    // const updatedUser = await User.updateOne(
    //   { _id: userId },
    //   { $push: { posts: createdPost._id } }
    // );
    // const updatedGroup = await Group.updateOne(
    //   { _id: groupId },
    //   { $push: { posts: createdPost._id } }
    // );

    createdPosts.push(createdPost);
  }
  console.log("posts seeded");

  // create friends
  for (let i = 0; i < 10; i += 1) {
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

  const groups = await Group.insertMany([
    {
      name: "Hiking",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      members: [userData[0]._id],
      posts: [createdPosts[0]._id],
    },
    {
      name: "Skiing",
      description:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
      members: [userData[1]._id],
      posts: [createdPosts[1]._id],
    },
    {
      name: "Painting",
      description:
        "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
      members: [userData[2]._id],
      posts: [createdPosts[2]._id],
    },
    {
      name: "Sculpture",
      description:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      members: [userData[3]._id],
      posts: [createdPosts[3]._id],
    },
    {
      name: "Bars",
      description:
        "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
      members: [userData[4]._id],
      posts: [createdPosts[4]._id],
    },
    {
      name: "Book club",
      description:
        "Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.",
      members: [userData[5]._id],
      posts: [createdPosts[5]._id],
    },
    {
      name: "Food pantry",
      description: "In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.",
      members: [userData[6]._id],
      posts: [createdPosts[6]._id]
    },
    {
      name: "Beach clean-up",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
      members: [userData[7]._id],
      posts: [createdPosts[7]._id]
    },
    {
      name: "Yoga",
      description: "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      members: [userData[8]._id],
      posts: [createdPosts[8]._id]
    },
    {
      name: "Walking",
      description: "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
      members: [userData[9]._id],
      posts: [createdPosts[9]._id]
    },
  ]);
  console.log('groups seeded')

  // push groups into users
  for (let i=0; i< userData.length; i++){
    await User.updateOne(
      {_id: userData[i]._id},
      {$push: {groups: groups[i]._id}})
  }
console.log('pushed groups into users')

  // create interest data
  const interestData = [
    { name: "Outdoors", groups: [groups[0]._id, groups[1]._id] },
    { name: "Arts and Crafts", groups: [groups[2]._id, groups[3]._id] },
    { name: "Social", groups: [groups[4]._id, groups[5]._id] },
    { name: "Service", groups: [groups[6]._id, groups[7]._id] },
    { name: "Health and Wellness", groups: [groups[8]._id, groups[9]._id] },
  ];

  const interests = await Interest.insertMany(interestData);

  console.log("interests seeded");

  // manually create groups

  // create groups
  //   const groupData = [];
  //   for (let i = 0; i < 10; i++) {
  //     const name = faker.company.companyName();
  //     const description = faker.lorem.paragraph();
  //     const createdGroup = await Group.create({ name, description });
  //     groupData.push(createdGroup);

  //     // push groups into interests
  //   }
  //   const createdGroups = await Group.collection.insertMany(groupData);
  //   console.log(groupData);
  //   console.log(createdGroups);
  //   console.log("groups seeded");
  //   console.log("interests seeded with groups");

  // push users into groups

  console.log("all done!");
  process.exit(0);
});
