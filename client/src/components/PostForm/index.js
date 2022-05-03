import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_GROUP, QUERY_ME } from "../../utils/queries";
import TextareaAutosize from '@mui/base/TextareaAutosize';

const PostForm = () => {
  const [postText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const {id: groupParams}= useParams()
  const [addPost, { error }] = useMutation(ADD_POST, {
    // update(cache, { data: { addPost } }) {
    //   try {
    //     // update group array's cache
    //     // could potentially not exist yet, so wrap in a try/catch
    //     const { group } = cache.readQuery({ query: QUERY_GROUP });
    //     cache.writeQuery({
    //       query: QUERY_GROUP,
    //       data: { group: {...group, addPost.group] } },
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }

    //   // update me object's cache
    //   const { me } = cache.readQuery({ query: QUERY_ME });
    //   cache.writeQuery({
    //     query: QUERY_ME,
    //     data: { me: { ...me, addPost.user] } },
    //   });
    // },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 1000) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
     const newPost = await addPost({
        variables: { postText, groupId: groupParams },
      });

      // clear form value
      console.log(newPost)
      setText("");
      setCharacterCount(0);
      window.location.replace(`/group/${groupParams}`)

    } catch (e) {
      console.error(e);
    }
  };

  return (
      <form
        className="form-group w-[70%] mt-5"
        onSubmit={handleFormSubmit}
      >
      <p className='font-[Poppins] text-2xl mb-2'>
      New post
      </p>
        
      
       <TextareaAutosize
          placeholder="Here's a new post..."
          value={postText}
          className="form-input col-12 col-md-9 mt-1"
          onChange={handleChange}
          minRows={3}
        ></TextareaAutosize>
        {/* <textarea
          placeholder="Here's a new post..."
          value={postText}
          className="form-control w-full border border-dark"
          onChange={handleChange}
        ></textarea> */}
         <p
        className={`m-0 font-[Poppins] ${characterCount === 1000 || error ? "text-error" : ""} d-block text-sm`}
      >
        Character Count: {characterCount}/1000
        {error && <span className="ml-2 text-red-500">Something went wrong...</span>}
      </p>
        <button className="font-[Poppins] btn text-center w-full sm:w-[25%] mt-5 py-3 px-6 my-4 bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500" type="submit">
          Submit
        </button>
      </form>
  );
};

export default PostForm;
