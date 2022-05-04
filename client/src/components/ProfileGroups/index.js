import React from 'react';
import { Link } from 'react-router-dom';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
// import InterestMenu from "../InterestMenu";
// import Auth from "../../utils/auth";
// import { useQuery } from "@apollo/client";
// import {QUERY_GROUPS} from "../../utils/queries";

const GroupList = ({ groups, title }) => {

    // const { loading, data } = useQuery(QUERY_GROUPS);

    // const group = data?.groups || [];

    // const loggedIn = Auth.loggedIn();

    if (!groups.length) {
        return <div className='bg-gray-100 rounded-lg p-6 shadow-xl w-[70%] font-[Poppins] text-center mx-auto'><h3>No Groups Joined Yet!</h3></div>;
    }

    return (
        <div>
       
        <h1 className='font-[Poppins] text-2xl mb-20 text-center'>{title}</h1>

        {/* <div maxWidth="lg" className="mt-10 flex-row flex-wrap justify-space-between mx-8">
          <InterestMenu />
        </div> */}
        {/* <Grid container justify="space-between" alignItems="stretch" spacing={3}> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:w-[75%] m-auto">
        {groups && 
                groups.map(group => (
             
                    <Container maxWidth="lg" className="font-[Poppins] mt-10 flex-row flex-wrap justify-center">
                        <Container>
                            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid>
                                        <div className=" rounded overflow-hidden shadow-md px-6 py-6 hover:bg-cyan-600 hover:text-white duration-500">
                                            <Link to={`/group/${group._id}`}>
                                                {/* <img src={`${group.image}`} alt={group.name} /> */}
                                                <h2 className="font-bold text-black-500 text-4xl mb-6">{group.name}</h2>
                                                {group.description}
                                            </Link>{' '}
                                        </div>
                                        
                            </Grid>
                            </Grid>
                        </Container>
                    </Container>

                ))}
                </div>
        {/* </Grid> */}
        </div>
    );
};

export default GroupList;

   

                    {/* <Container maxWidth="lg" className="mt-10 flex-row flex-wrap justify-space-between w-[75%] mx-8">
                        <Container>
                            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <div className="my-2">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <h2 className="font-[Poppins] font-bold text-black-500 text-4xl mb-6">{group.name}</h2>
                                        {group.description}
                                        </div>
                                </div>
                            </Grid>
                            </Grid>
                        </Container>
                    </Container> */}

                     {/* <div className='w-[75%] m-auto flex items-center justify-between'>
                        <div key={group._id} className="p-3 mb-8 border border-1 border-gray-300 rounded">
                            <p className="card-header">
                                <Link // what does this mean??
                                    to={`/group/${group._id}`}
                                    style={{ fontWeight: 700 }}
                                    className="text-light"
                                >
                                    <img src={`${group.image}`} alt={group.name} />
                                    {group.name}
                                    {group.description}
                                </Link>{' '}
                            </p>
                        
                        </div>
                    </div> */}