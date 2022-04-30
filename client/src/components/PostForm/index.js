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
    //       data: { group: {...group,  posts: [...group.posts, addPost] } },
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }

    //   // update me object's cache
    //   const { me } = cache.readQuery({ query: QUERY_ME });
    //   cache.writeQuery({
    //     query: QUERY_ME,
    //     data: { me: { ...me, posts: [...me.posts, addPost] } },
    //   });
    // },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
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
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new post..."
          value={postText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
