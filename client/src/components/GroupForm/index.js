import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_GROUP } from "../../utils/mutations";
import { QUERY_GROUPS, QUERY_ME, QUERY_INTERESTS} from "../../utils/queries";

const GroupForm = () => {
  const [groupName, setName] = useState("");
  const [groupText, setText] = useState("");
  const [nameCharacterCount, setNameCharacterCount] = useState(0);
  const [textCharacterCount, setTextCharacterCount] = useState(0);
  const{loading, data}= useQuery(QUERY_INTERESTS)
  const interests = data?.interests || []
  let {name} = interests
console.log(interests)


  const [addGroup, { error }] = useMutation(ADD_GROUP, {
    update(cache, { data: { addGroup } }) {
      try {
        // update group array's cache
        // could potentially not exist yet, so wxrap in a try/catch
        const { groups } = cache.readQuery({ query: QUERY_GROUPS });
        cache.writeQuery({
          query: QUERY_GROUPS,
          data: { groups: [addGroup, ...groups] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, groups: [...me.groups, addGroup] } },
      });
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
        variables: { name, input: {groupName, groupText} },
      });

      // clear form value
      setText("");
      setName("")
      setTextCharacterCount(0);
      setNameCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${textCharacterCount ===700 || nameCharacterCount === 280 || error ? "text-error" : ""}`}
      >
        {nameCharacterCount}/280 | {textCharacterCount}/700
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
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
        <select>
        {interests.map(({name})=> (
          <option key={name} value={name}>{name}</option>
        ))}
        </select>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GroupForm;
