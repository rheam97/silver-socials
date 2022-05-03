import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_GROUP, QUERY_ME } from "../../utils/queries";

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
        className="form-group w-[75%] mt-5"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new post..."
          value={postText}
          className="form-control w-full border border-dark"
          onChange={handleChange}
        ></textarea>
         <p
        className={`m-0 ${characterCount === 1000 || error ? "text-error" : ""} d-block text-sm`}
      >
        Character Count: {characterCount}/1000
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
        <button className="btn w-[10%] md:w-[10%] lg:w-[10%] bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500" type="submit">
          Submit
        </button>
      </form>
  );
};

export default PostForm;
