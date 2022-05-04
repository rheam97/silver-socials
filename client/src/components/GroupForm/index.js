import React, { useState } from "react";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import Card from "@mui/material/Card";
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';

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
  const group = data?.group || [];

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
            interests: [...interests, addGroup],
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
        variables: {
          name: document.getElementById("interestname").value,
          input: {
            name: groupName,
            description: groupText,
            image: document.getElementById("groupimage").value,
          },
        },
      });

      // clear form value
      setText("");
      setName("");
      setTextCharacterCount(0);
      setNameCharacterCount(0);
      window.location.replace('/')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg px-6 py-6 font-[Poppins]">
        <h2 className="font-bold text-cyan-600 text-xl mb-2 block mr-3">
          Add group
        </h2>

        <form class="flex items-center space-x-6" onSubmit={handleFormSubmit}>
          <label htmlFor="groupimage" class="block my-3">
            Select an image:
            {/* <label class="block my-3"> */}
            {/* <span class="sr-only">Choose profile photo</span> */}
            <input
              type="file"
              id="groupimage"
              name="groupimage"
              class="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-1
            file:text-sm file:font-semibold
            file:border-cyan-600 file:text-black
            hover:file:bg-cyan-900 hover:file:text-white
          "
            />
          </label>
        </form>

        <form
          className="flex-row justify-center justify-space-between-md align-stretch"
          onSubmit={handleFormSubmit}
        >
          <p
            className={`m-0 text-gray-400 text-xs ${
              (textCharacterCount === 700 && nameCharacterCount === 280) ||
              error
                ? "text-error"
                : ""
            }`}
          >
            New group name ({nameCharacterCount}/280)
            <p>
              {error && (
                <span className="text-red-500 text-xs">
                  Something went wrong...
                </span>
              )}
            </p>
          </p>

          {/* <label htmlFor="groupimage">Select an image:</label> */}
          {/* <input type="file" id="groupimage" name="groupimage"/> */}
          <TextareaAutosize
            placeholder="New group name..."
            value={groupName}
            className="form-input col-12 col-md-9 mt-1"
            onChange={handleNameChange}
            minRows={3}
          ></TextareaAutosize>
          <br />
          <p
            className={`m-0 text-gray-400 text-xs ${
              (textCharacterCount === 700 && nameCharacterCount === 280) ||
              error
                ? "text-error"
                : ""
            }`}
          >
            {" "}
            New group description ({textCharacterCount}/700)
            <p>
              {error && (
                <span className="text-red-500 text-xs">
                  Something went wrong...
                </span>
              )}
            </p>
          </p>
          <TextareaAutosize
            placeholder="New group description..."
            value={groupText}
            className="form-input col-12 col-md-9 mt-1"
            onChange={handleTextChange}
            minRows={3}
          ></TextareaAutosize>
          <br />
          <select
            id="interestname"
            className="w-full rounded-full border-cyan-600 border-2 py-2 px-4"
          >
            {interests.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
            {/* <img alt={group.name} src={`${group.image}`} className="w-[70%] h-400 shadow-lg object-cover"/> */}
          </select>

          {/* <SelectForm /> */}

          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="interestname">Group</InputLabel>    
          <Select 
          id ='interestname'
          labelId='interestname'
          value={interest}
          label='name'
          onChange={handleChange}
          >
                {interests.map(({ name }) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
          </Select>
        </FormControl> */}
          <button
            className="font-[Poppins] text-center w-full mt-5 py-3 px-6 my-4 bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Card>
  );
};

export default GroupForm;
