import React from "react";
import { Link } from "react-router-dom";

export default props => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/rome/1">Rome</Link>
        </li>
      </ul>
    </div>
  );
};
