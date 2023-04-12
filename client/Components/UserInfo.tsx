// React Imports
import React, { useEffect, useState } from 'react';

// Type Declarations
type UserProps = {
  user: {
    username: string;
    arn: string;
    _id: string;
  };
};

// Main Function
function UserInfo(props: UserProps) {
  //
  // State Declaration
  const [formVisible, setFormVisible] = useState(false);
  const [newArn, setNewArn] = useState('');

  // Update ARN Submission
  function sendNewArn() {
    fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: props.user.username,
        arn: newArn,
      }),
    });
  }

  // Toggle showForm State
  function showForm() {
    // Toggle Form Visibility State
    if (!formVisible) {
      setFormVisible(true);
    } else {
      setFormVisible(false);
    }
  }

  // Hide and Show update Form
  useEffect(() => {
    const form = document.getElementById('new-arn') as HTMLDivElement;
    const edit = document.getElementById('edit') as HTMLDivElement;
    if (formVisible) {
      form.style.display = '';
      edit.innerHTML = '^';
      edit.style.border = 'none';
    } else {
      form.style.display = 'none';
      edit.innerHTML = 'edit';
      edit.style.border = '1px solid rgb(224, 144, 52)';
    }
  });

  // Render Components
  return (
    <main id="main-user-info">
      <div id="user-info">
        <p>
          <span>Userame</span> : {props.user.username}
        </p>
        <p>
          <span>ARN</span> : {props.user.arn}{' '}
          <button
            id="edit"
            onClick={() => {
              showForm();
            }}>
            edit
          </button>
        </p>
        <form id="new-arn">
          <input
            id="arn-input"
            type="text"
            placeholder="New ARN"
            onChange={(e) => {
              setNewArn(e.target.value);
            }}
          />
          <button
            onClick={() => {
              sendNewArn();
            }}>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default UserInfo;
