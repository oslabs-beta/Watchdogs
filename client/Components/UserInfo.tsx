// React Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import '../scss/UserInfo.scss';

// Import types
import { UserInfoProps, ArnBodyUpdateType, ResponseDataType } from '../types';

function UserInfo(props: UserInfoProps) {
  const [formVisible, setFormVisible] = useState(false as boolean);
  const [newArn, setNewArn] = useState('' as string);
  const [newRegion, setNewRegion] = useState('us-east-1' as string);
  const { loading, setUser, setMetrics, setLoading } = props;
  const navigate = useNavigate();

  // Update ARN Submission
  function sendNewArn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!newArn.length || !newRegion.length) {
      return;
    }
    setLoading(true);
    fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: props.user.username,
        arn: newArn,
        region: newRegion,
      } as ArnBodyUpdateType),
    })
      .then((res): Promise<ResponseDataType> => res.json())
      .then((res) => {
        setUser(res.user);
        setMetrics(res.metrics);
        setLoading(false);
      });
  }

  // Delete Account
  function deleteAccount() {
    if (window.confirm('Are you sure you want to delete your account?')) {
      fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: props.user.username }),
      }).then(() => navigate('/login'));
    }
  }

  function sendLogout() {
    fetch('/api/logout').then(() => navigate('/login'));
  }

  // Toggle showForm State
  function showForm(): void {
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
      edit.innerHTML = 'Edit *';
      // edit.style.border = 'none';
    } else {
      if (form) {
        form.style.display = 'none';
        edit.innerHTML = 'Edit ARN / Region';
        edit.style.border = '1px solid rgb(224, 144, 52)';
      }
    }
  });

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // Render Components
  return (
    <main id="main-user-info">
      <div id="user-info">
        <p id="user-username">
          <span>Username</span> : {props.user.username}
        </p>
        <p id="user-region">
          <span>Region</span> : {props.user.region}
        </p>
        <p id="user-arn">
          <span>ARN</span> : {props.user.arn}{' '}
        </p>
        <div>
          <button
            id="edit"
            onClick={() => {
              showForm();
            }}></button>
          <button
            onClick={() => {
              deleteAccount();
            }}
            id="delete-button">
            Delete Account
          </button>
          <button
            onClick={() => {
              sendLogout();
            }}
            id="logout-button">
            Log Out
          </button>
        </div>
        <form id="new-arn">
          <input
            id="arn-input"
            type="text"
            placeholder="New ARN"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewArn(e.target.value);
            }}
          />
          <select
            name="Select Region"
            id="region-selector"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
            onClick={(e) => {
              sendNewArn(e);
            }}>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default UserInfo;
