const {Post, Interest, Group, User} = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const {signToken, authMiddleware} =require('../utils/auth')
const resolvers = {
    // get me profile with groups 
    //get groups under interest
    // get interests
    // get group details with members and posts
    // get other user details
    // add user
    // login
    // add group
    // add post remove post
    Query: {
        me: async(parent, args, context)=> {
            if(context.user){
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('groups')
                .populate('posts')
                .populate('friends')
    
                return userData
            }
            throw new AuthenticationError('Not logged in.')
       
        },
        interests: async ()=> {
            return await Interest.find()
            .populate('groups')
        },
        interest: async (parent, {name}, context)=> {
            return await Interest.findOne(name).populate('groups')
        },
        group: async(parent, {_id})=> {
            return Group.findById(_id)
            .populate('members')
            .populate('posts')
        },
        posts: async()=> {
            return await Post.find()
        },
        post: async(parent, args, context)=> {
            return await Post.findById(args.postId)
        },
        getallgroups: async() => {
            return await Group.find()
            .populate('members')
            .populate('posts')
        },
        users: async()=> {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('posts')
            .populate('groups')
        },
        user: async (parent, {username}, context)=> {
            return User.findOne(username)
            .select('-__v -password')
            .populate('friends')
            .execPopulate('posts')
            .execPopulate('groups')
        }
    },
    Mutation: {
        addUser: async(parent, args)=> {
            const user = await User.create(args)
            const token = signToken(user)
            return {token, user}
        },
        login: async (parent, {email, password})=> {
            const user = await User.findOne({email})
            if(!user){
                throw new AuthenticationError('Incorrect credentials.')
            }
            const correctPw = await user.isCorrectPassword(password)
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials.')
            }
            const token = signToken(user)
            return {token, user}
        },
        addPost: async(parent, {postText, groupId}, context)=> {
            if(context.user){
                // console.log(args)
                const post = await Post.create({postText: postText, username: context.user.username})
               const updatedUser= await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {posts: post}},
                    {new: true}
                ).populate('posts')
               const updatedGroup = await Group.findByIdAndUpdate(
                    {_id: groupId},
                    {$push: {posts: post}},
                    {new: true}
                ).populate('posts')
                return {user: updatedUser, group: updatedGroup}
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        removePost: async(parent, {groupId, postId}, context)=> {
            if(context.user){
                const updatedGroup = await Group.findByIdAndUpdate(
                    {_id: groupId},
                    {$pull: {posts: postId}},
                    {new: true}
                ).populate('posts')
               const updatedUser= await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {posts: postId}},
                    {new: true}
                ).populate('posts')
                return {user: updatedUser, group: updatedGroup}
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        addGroup: async (parent, {name, input}, context) => {
            if (context.user) {
            const group = await Group.create(input)
              const updatedInterest = await Interest.findOneAndUpdate(
                { name: name },
                { $push: { groups:  {_id: group._id } }},
                { new: true, runValidators: true }
              ).populate('groups');
      
              return updatedInterest;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
          // join group: user to group
          joinGroup: async (parent, {groupId}, context) => {
            if (context.user) {
              const updatedGroup = await Group.findOneAndUpdate(
                { _id: groupId },
                { $push: { members: { _id: context.user._id } } },
                { new: true }
              ).populate('members');
             const updatedUser = await User.findOneAndUpdate(
                  {_id: context.user._id},
                  {$push: {groups: {_id: groupId}}},
                  { new: true}
              ).populate('groups')
      
              return {user: updatedUser, group: updatedGroup}
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
        // addFriend: async(parent, {friendId}, context)=> {
        // if(context.user){
        //     const updatedUser = await User.findOneAndUpdate(
        //         {_id: context.user._id},
        //         {$addToSet: {friends: friendId}},
        //         {new: true},
        //     ).populate('friends')
        //     return updatedUser
        // // }
        // throw new AuthenticationError('You need to be logged in.')
        // }
        
    }
}

module.exports = resolvers