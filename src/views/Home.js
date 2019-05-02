import React from "react";
import { Link } from "@reach/router";

export default props => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/rome/1">Rome</Link>
        </li>
        <li>
          <Link to="/texas/1">Texas</Link>
        </li>
      </ul>
    </div>
  );
};
