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
        },
        interest: async (parent, {name}, context)=> {
            return await Interest.findOne(name).populate('groups')
        },
        group: async(parent, {_id})=> {
            return Group.findById(_id)
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
            .populate('posts')
            .populate('groups')
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
        addPost: async(parent, args, context)=> {
            if(context.user){
                const post = await Post.create({...args, username: context.user.username})

                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {posts: args._id}},
                    {new: true}
                )
                await Group.findByIdAndUpdate(
                    {_id: group._id},
                    {$addToSet: {posts: args._id}},
                    {new: true}
                )
                return post
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        removePost: async(parent, {groupId, postId}, context)=> {
            if(context.user){
                const updatedGroup = await Group.findByIdAndUpdate(
                    {_id: groupId},
                    {$pull: {posts: postId}},
                    {new: true}
                )
                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {posts: postId}},
                    {new: true}
                )
                return updatedGroup
            }
            throw new AuthenticationError('You need to be logged in.')
        },
        addGroup: async (parent, {name, input}, context) => {
            if (context.user) {
            const group = await Group.create(input)
            //   await Interest.findOneAndUpdate(
            //     { name: name },
            //     { $push: { groups: { input } } },
            //     { new: true, runValidators: true }
            //   );
      
              return group;
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