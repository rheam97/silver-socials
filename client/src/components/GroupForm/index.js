import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_GROUP } from "../../utils/mutations";
import {
  QUERY_GROUPS,
  QUERY_ME,
  QUERY_INTERESTS2,
  QUERY_INTERESTS,
  QUERY_INTEREST,
} from "../../utils/queries";

const GroupForm = () => {
  const [groupName, setName] = useState("");
  const [groupText, setText] = useState("");
  const [nameCharacterCount, setNameCharacterCount] = useState(0);
  const [textCharacterCount, setTextCharacterCount] = useState(0);
  const { loading, data } = useQuery(QUERY_INTERESTS);
  const interests = data?.interests || [];


  const [addGroup, { error }] = useMutation(ADD_GROUP, {
    update(cache, { data: { addGroup } }) {
      try {
        // update group array's cache
        // could potentially not exist yet, so wxrap in a try/catch
        //not sure about this because mutation returns interest?
        const { interests } = cache.readQuery({ query: QUERY_INTERESTS2 });
        cache.writeQuery({
          query: QUERY_INTERESTS2,
          data: {
            interests: [ ...interests, addGroup ],
          },
        });
      } catch (e) {
        console.error(e);
      }
      // update interest object cache****** alos how to query for specific interest?
    
      // update me object's cache
      // not sure about this because mutation returns interest?
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, groups: [...me.groups, addGroup] } },
      // });
    },
  });

  // update state based on form input changes
  const handleTextChange = (event) => {
    if (event.target.value.length <= 700) {
      setText(event.target.value);
      setTextCharacterCount(event.target.value.length);
    }
  };
  const handleNameChange = (event) => {
    if (event.target.value.length <= 280) {
      setName(event.target.value);
      setNameCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addGroup({
        variables: { name: document.getElementById('interestname').value, input: { name: groupName, description: groupText, image: document.getElementById("groupimage").value } },
      });

      // clear form value
      setText("");
      setName("");
      setTextCharacterCount(0);
      setNameCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div cclassName="max-w-sm rounded overflow-hidden shadow-lg">
      <p
        className={`m-0 ${
          (textCharacterCount === 700 && nameCharacterCount === 280) || error
            ? "text-error"
            : ""
        }`}
      >
        {nameCharacterCount}/280 | {textCharacterCount}/700
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="groupimage">Select an image:</label>
        <input type="file" id="groupimage" name="groupimage"/>
        <textarea
          placeholder="New group name..."
          value={groupName}
          className="form-input col-12 col-md-9"
          onChange={handleNameChange}
        ></textarea>
        <textarea
          placeholder="New group description..."
          value={groupText}
          className="form-input col-12 col-md-9"
          onChange={handleTextChange}
        ></textarea>
        <select id ='interestname'>
          {interests.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button className='text-center mt-12 py-3 px-6 w-[45%] md:w-[45%] lg:w-[40%] my-4 bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500' type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GroupForm;
