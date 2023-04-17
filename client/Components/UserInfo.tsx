// React Imports
import React, { useEffect, useState } from 'react';

// Type Declarations
type UserProps = {
  user: {
    username: string;
    arn: string;
    _id: string;
    region: string;
  };
  loading: boolean;
  setUser: ( arg0: {
       arn: string,
    region:string,
    password: string,
    username: string,
    __v: number,
    _id: string}
    ) => void;
  setLoading: (arg0:boolean) => void;
    setMetrics: (arg0: any) => void
};

// Main Function
function UserInfo(props: UserProps) {
  //
  // State Declaration
  const [formVisible, setFormVisible] = useState(false);
  const [newArn, setNewArn] = useState('');
  const [newRegion, setNewRegion] = useState('');
  const { loading, setUser , setMetrics, setLoading } = props;

  // Update ARN Submission
  function sendNewArn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true)
    fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: props.user.username,
        arn: newArn,
        region: newRegion,
      }),
    }).then(res => res.json()).then((res) => {
      setUser(res.user)
      setMetrics(res.metrics)
      setLoading(false)
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
      edit.innerHTML = 'edit *';
      // edit.style.border = 'none';
    } else {
      form.style.display = 'none';
      edit.innerHTML = 'edit ';
      edit.style.border = '1px solid rgb(224, 144, 52)';
    }
  });

  // Show/Hide Loading Display
  useEffect(() => {
    const loadingSection = document.getElementById('loading-section') as HTMLDivElement;
    const userInfo = document.getElementById('main-user-info') as HTMLDivElement;

    if (loading) {
      loadingSection.style.display = '';
      userInfo.style.display = 'none';
    } else {
      loadingSection.style.display = 'none';
      userInfo.style.display = '';
    }
  });

  // Render Components
  return (
    <main id="main-user-info">
      <div id="user-info">
        <p>
          <span>Username</span> : {props.user.username}
        </p>
        <p>
          <span>ARN</span> : {props.user.arn}{' '}
          <button
            id="edit"
            onClick={() => {
              showForm();
            }}>
            edit v
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
          <select
            name="Select Region"
            id="region-selector"
            onChange={(e) => {
              setNewRegion(e.target.value);
            }}>
            <option value="us-east-1">US East 1 (N. Virginia)</option>
            <option value="us-east-2">US East 2 (Ohio)</option>
            <option value="us-west-1">US West 1 (N. California) </option>
            <option value="us-west-2">US West 2 (Oregon)</option>
            <option value="ap-south-1">AP South 1 (Mumbai)</option>
            <option value="ap-northeast-1">AP Northeast 1 (Tokyo)</option>
            <option value="ap-northeast-2">AP Northeast 2 (Seoul)</option>
            <option value="ap-northeast-3">AP Northeast 3 (Osaka)</option>
            <option value="ap-southeast-1">AP Southeast 1 (Singapore)</option>
            <option value="ap-southeast-2">AP Southeast 2 (Sydney)</option>
            <option value="ca-central-1">CA Central 1 (Canada)</option>
            <option value="eu-central-1">Europe Central 1 (Frankfurt)</option>
            <option value="eu-west-1">Europe West 1 (Ireland)</option>
            <option value="eu-west-2">Europe West 2 (London)</option>
            <option value="eu-west-3">Europe West 3 (Paris)</option>
            <option value="eu-north-1">EU North 1 (Stockholm)</option>
            <option value="sa-east-1">SA East 1 (Sao Paulo)</option>
          </select>
          <button
            onClick={(e)=> {
              sendNewArn(e)
            }}>
            Submit
          </button>
        </form>
        <p>
          <span>Region</span> : {props.user.region}
        </p>
      </div>
    </main>
  );
}

export default UserInfo;
