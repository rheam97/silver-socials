import React from 'react';
import { Link } from 'react-router-dom';

const GroupList = ({ groups, title }) => {
    if (!groups.length) {
        return <h3>No Groups Joined Yet!</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {groups &&
                groups.map(group => (
                    <div key={group._id} className="card mb-3">
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
                ))}
        </div>
    );
};

export default GroupList;
