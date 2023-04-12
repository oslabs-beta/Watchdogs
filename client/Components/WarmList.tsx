// React Imports
import React from 'react';

// Type Declarations
type UserProps = {
  user: {
    username: string;
    arn: string;
    _id: string;
  };
};

// Main Function
function WarmList(props: UserProps) {
  return (
    <main id="main-warm-list">
      <div id="warm-list">
        <p>This is the warm list</p>
      </div>
    </main>
  );
}

export default WarmList;
