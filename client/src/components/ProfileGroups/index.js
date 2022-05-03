import React from 'react';
import { Link } from 'react-router-dom';


const GroupList = ({ groups, title }) => {
    if (!groups.length) {
        return <h3>No Groups Joined Yet!</h3>;
    }

    return (
        <div>
        <h1>{title}</h1>
        {groups && 
                groups.map(group => (
                
                    <div>

                        <div className="grid grid-cols-3 gab-4 p-3 mb-8 border border-1 border-gray-300 rounded">
                        <div key={group._id} className="">
                            <p className="card-header">
                                <Link // what does this mean??
                                    to={`/group/${group._id}`}
                                    style={{ fontWeight: 700 }}
                                    className="text-light"
                                >
                                    {group.name}
                                </Link>{' '}
                            </p>
                            {/* <div className="card-body">
                                <Link to={`/thought/${thought._id}`}>
                                    <p>{thought.thoughtText}</p>
                                    <p className="mb-0">
                                        Reactions: {thought.reactionCount} || Click to{' '}
                                        {thought.reactionCount ? 'see' : 'start'} the discussion!
                                    </p>
                                </Link>
                            </div> */}
                        </div>
                        </div>
                    
                    </div>
                    
                ))}
                </div>
    );
};

export default GroupList;

