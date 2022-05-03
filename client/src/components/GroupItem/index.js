import React from "react";
import { Link } from "react-router-dom";

import {JOIN_GROUP} from '../../utils/mutations'
import { useQuery, useMutation } from "@apollo/client";
import {QUERY_ME, QUERY_GROUP} from '../../utils/queries'
//import GroupItem from "../../components/GroupItem";
// import { pluralize } from "../../utils/helpers";
//import { useStoreContext } from "../../utils/GlobalState";
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function GroupItem(group) {

  const { image, name, _id, members} = group;
  // const [joinGroup] = useMutation(JOIN_GROUP)
// do i need to add cache?????
// console.log(members)

const [joinGroup, { error }] = useMutation(JOIN_GROUP, {
  // update(cache, { data: { joinGroup } }) {
  //   try {
  //     // update group array's cache
  //     // could potentially not exist yet, so wxrap in a try/catch
  //     //not sure about this because mutation returns interest?
  //     const { group } = cache.readQuery({ query: QUERY_GROUP });
  //     cache.writeQuery({
  //       query: QUERY_GROUP,
  //       data: { group: [...group, members: [...group.members, joinGroup]] },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   // update me object's cache
  //   const { me } = cache.readQuery({ query: QUERY_ME });
  //   cache.writeQuery({
  //     query: QUERY_ME,
  //     data: { me: { ...me, groups: [...me.groups, joinGroup] } },
  //   });
  // },
});

  const joinAsMember = async() => {

    try {
      await joinGroup({
        variables: { groupId: group._id },
      });
      console.log(group);
    } catch (e) {
      console.error(e);
    }
   
 
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>

    <CardMedia
        component="img"
        alt={name}
        height="200px !important"
        src={`${image}`}
        onError = {e => e.target.style.display = 'none'}
        // image="https://source.unsplash.com/random"
      />
      <CardContent className='!pb-0'>
      <Typography gutterBottom variant="h5" component="div">
      <Link to={`/group/${_id}`}>
        {/* <img alt={name} src={`/images/${image}`} /> */}
        <span className='font-[Poppins] hover:text-cyan-600'>{name}</span>
      </Link>
      </Typography>
      </CardContent>
      <CardActions>
      <Button size="small"><span className='font-[Poppins] text-cyan-600 hover:text-red-600'>{members.length} <span>{members.length===1 ? <span>Member</span> : <span>Members</span> }</span></span></Button>
      
      <Button size="small" onClick={joinAsMember}><span className='font-[Poppins] text-cyan-600 hover:text-red-600'>Join this Group Now</span></Button>
      </CardActions>
      {/* <button onClick={joinAsMember}>Join this Group Now</button> */}
      </CardActionArea>
      </Card>
    
  );
}

export default GroupItem;


