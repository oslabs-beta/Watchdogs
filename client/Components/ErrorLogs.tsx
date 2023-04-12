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
function ErrorLogs(props: UserProps) {
  return (
    <main id="main-error-logs">
      <div id="error-logs">
        <p>These are the error logs.</p>
      </div>
    </main>
  );
}

export default ErrorLogs;
