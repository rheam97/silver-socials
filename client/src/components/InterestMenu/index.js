// may be able to consolidate into one group list file using conditional rendering?

import React from "react";
import { Link } from "react-router-dom";

const InterestList = ({ groups, title }) => {
  if (!groups.length) {
    return <h3>No Groups Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {groups &&
        groups.map((group) => (
          <div key={group._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${group.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {group.username}
              </Link>{" "}
              group on {group.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/group/${group._id}`}>
                <p>{group.groupText}</p>
                <p className="mb-0">
                  Posts: {group.postCount} || Click to{" "}
                  {group.postCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default InterestList;
