import React from 'react';
import { fireEvent, render, RenderResult, waitFor, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../client/Components/Login';
import Signup from '../client/Components/Signup';
import Home from '../client/Components/Home';

describe('React Component Testing', () => {
  let app: RenderResult;

  describe('SignUp Page', () => {
    beforeEach(() => {
      app = render(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      );
    });

    test('Renders a signup container', () => {
      const signup = app.container.querySelector('#signup-container');
      expect(signup).toBeInTheDocument();
    });

    test('Renders Username, Password, ARN, and Region fields', () => {
      const username = app.container.querySelector('#signup-username');
      expect(username).toBeInTheDocument();

      const password = app.container.querySelector('#signup-password');
      expect(password).toBeInTheDocument();

      const arn = app.container.querySelector('#arn');
      expect(arn).toBeInTheDocument();

      const region = app.container.querySelector('#region-selector');
      expect(region).toBeInTheDocument();
    });

    test('Renders a Connect to AWS and Return to Login links', () => {
      const arnSetup = app.container.querySelector('#arn-setup');
      expect(arnSetup).toBeInTheDocument();

      const loginLink = app.getByText('Back to Login');
      expect(loginLink).toBeInTheDocument();
    });

    test('Renders a Submit button', () => {
      const signupButton = app.getByRole('button', {
        name: 'Signup',
      });
      expect(signupButton).toBeInTheDocument();
    });

    test("Displays 'Username or Password cannot be empty' if fields are empty", () => {
      fireEvent.click(
        app.getByRole('button', {
          name: 'Signup',
        })
      );
      const errorDisplay = app.container.querySelector('#user-already-exists');
      expect(errorDisplay).toHaveTextContent('Username or Password cannot be empty');
    });

    test("Displays 'Username Already Exists' if username already exists", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ code: 11000 }),
        } as any)
      );
      const username = app.container.querySelector('#signup-username') as HTMLInputElement;
      fireEvent.change(username, { target: { value: 'test' } });

      const password = app.container.querySelector('#signup-password') as HTMLInputElement;
      fireEvent.change(password, { target: { value: 'test' } });

      const arn = app.container.querySelector('#arn') as HTMLInputElement;
      fireEvent.change(arn, { target: { value: 'test' } });

      fireEvent.click(
        app.getByRole('button', {
          name: 'Signup',
        })
      );

      await waitFor(() => {
        const error = app.getByText('Username already exists');
        expect(error).toBeInTheDocument();
      });
    });
  });

  describe('Login Page', () => {
    beforeEach(() => {
      app = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
    });
    test('Renders a login container', () => {
      const login = app.container.querySelector('#login-container');
      expect(login).toBeInTheDocument();
    });

    test('Renders Username and Password fields', () => {
      const username = app.container.querySelector('#login-username');
      const password = app.container.querySelector('#login-password');

      expect(username).toBeInTheDocument();
      expect(password).toBeInTheDocument();
    });

    test('Renders a Login button', () => {
      const loginButton = app.getByRole('button', {
        name: 'Login',
      });
      expect(loginButton).toBeInTheDocument();
    });

    test('Renders links for Signup Page and Github', () => {
      const signupLink = app.getByText('Click Here to Sign Up');
      expect(signupLink).toBeInTheDocument();

      const githubLink = app.container.querySelector('#login-github-link');
      expect(githubLink).toBeInTheDocument();
    });

    test("Displays 'invalid username or password' if input is invalid", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ match: false }),
        } as any)
      );

      fireEvent.click(
        app.getByRole('button', {
          name: 'Login',
        })
      );

      await waitFor(() => {
        const error = app.getByText('Invalid Username or Password');
        expect(error).toBeInTheDocument();
      });
    });
  });

  describe('Home Page', () => {
    describe('Nav Bar', () => {
      beforeEach(() => {
        app = render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({
                user: {
                  arn: 'testarn',
                  region: 'testregion',
                  password: 'testpassword',
                  username: 'testusername',
                  __v: 0,
                  _id: 'testid',
                },
              } as any),
          } as any)
        );
      });

      test('Renders a Nav Bar component', () => {
        const navbar = app.getByRole('navigation');
        expect(navbar).toBeInTheDocument();
      });

      test('Displays Logo, Functions, Warm list, and Username in Nav Bar', async () => {
        await waitFor(() => {
          const functionsLink = app.getByText('Functions');
          expect(functionsLink).toBeInTheDocument();

          const warmLink = app.getByText('Incubator');
          expect(warmLink).toBeInTheDocument();

          const usernameLink = app.getByText('testusername');
          expect(usernameLink).toBeInTheDocument();
        });
      });
    });

    // describe('Loading Display', () => {});

    describe('FunctionsList', () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({
                user: {
                  arn: 'testarn',
                  region: 'testregion',
                  password: 'testpassword',
                  username: 'testusername',
                  __v: 0,
                  _id: 'testid',
                },
                metrics: {
                  testfunctionname: {
                    Invocations: {
                      timestamps: ['a', 'b', 'c'],
                      values: [1, 2, 3],
                    },
                    Duration: {
                      timestamps: ['a', 'b', 'c'],
                      values: [1, 2, 3],
                    },
                    Throttles: {
                      timestamps: ['a', 'b', 'c'],
                      values: [1, 2, 3],
                    },
                    Errors: {
                      timestamps: ['a', 'b', 'c'],
                      values: [1, 2, 3],
                    },
                  },
                },
              } as any),
          } as any)
        );
        app = render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
      });

      test('Renders a Functions List container', async () => {
        await waitFor(() => {
          const functionsList = app.container.querySelector('#functions-list');
          expect(functionsList).toBeInTheDocument();
        });
      });

      test('Renders Refresh, List, and Overview Buttons, along with Timeframe, Increment, and Filter Results Selectors', async () => {
        await waitFor(() => {
          const list = app.container.querySelector('#list');
          expect(list).toBeInTheDocument();

          const pieButton = app.container.querySelector('#pie');
          expect(pieButton).toBeInTheDocument();

          const refreshButton = app.container.querySelector('#refresh-button');
          expect(refreshButton).toBeInTheDocument();

          const timeframe = app.container.querySelector('#timeframe-selector');
          expect(timeframe).toBeInTheDocument();

          const increment = app.container.querySelector('#increment-selector');
          expect(increment).toBeInTheDocument();
        });
      });

      test('Renders a Function component if a function is present', async () => {
        await waitFor(() => {
          const testFunction = app.container.querySelector('#testfunctionname');
          expect(testFunction).toBeInTheDocument();
        });
      });

      test('Function component contains a Function Name, Chart, and Error Logs Buttons', async () => {
        await waitFor(() => {
          const functionName = app.getByText(`"testfunctionname"`);
          expect(functionName).toBeInTheDocument();

          const chart = app.container.querySelector('#testfunctionname-chart');
          expect(chart).toBeInTheDocument();

          const errorLogsPdf = app.getByRole('button', {
            name: 'PDF',
          });
          expect(errorLogsPdf).toBeInTheDocument();

          const errorLogsSpreadsheet = app.getByRole('button', {
            name: 'Spreadsheet',
          });
          expect(errorLogsSpreadsheet).toBeInTheDocument();
        });
      });

      test('Renders a Pie Chart component if a function is present', async () => {
        await waitFor(() => {
          fireEvent.click(
            app.getByRole('button', {
              name: 'Overview',
            })
          );
          const pieChart = app.container.querySelector('#pielist');
          expect(pieChart).toBeInTheDocument();
        });
      });
    });

    describe('No Functions', () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({
                user: {
                  arn: 'testarn',
                  region: 'testregion',
                  password: 'testpassword',
                  username: 'testusername',
                  __v: 0,
                  _id: 'testid',
                },
                nofunc: true,
              } as any),
          } as any)
        );
        app = render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
      });

      test("Displays 'No Functions Found' if there are no functions present", async () => {
        await waitFor(() => {
          const noFuncDisplay = app.container.querySelector('#nofunc');
          expect(noFuncDisplay).toBeInTheDocument();
        });
      });
    });

    describe('User Info', () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({
                user: {
                  arn: 'testarn',
                  region: 'testregion',
                  password: 'testpassword',
                  username: 'testusername',
                  __v: 0,
                  _id: 'testid',
                },
              } as any),
          } as any)
        );
        app = render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
      });
      test('Renders a User Info container', async () => {
        await waitFor(() => {
          fireEvent.click(app.getByText('testusername'));
          const userInfoContainer = app.container.querySelector('#user-info');
          expect(userInfoContainer).toBeInTheDocument();
        });
      });

      test('Renders Username, Region, and ARN fields', async () => {
        await waitFor(() => {
          fireEvent.click(app.getByText('testusername'));
          const username = app.container.querySelector('#user-username');
          expect(username).toBeInTheDocument();

          const region = app.container.querySelector('#user-region');
          expect(region).toBeInTheDocument();

          const arn = app.container.querySelector('#user-arn');
          expect(arn).toBeInTheDocument();
        });
      });

      test('Renders Edit, Delete Account, and Logout Buttons', async () => {
        await waitFor(() => {
          fireEvent.click(app.getByText('testusername'));
          const editButton = app.container.querySelector('#edit');
          expect(editButton).toBeInTheDocument();

          const deleteButton = app.container.querySelector('#delete-button');
          expect(deleteButton).toBeInTheDocument();

          const logoutButton = app.container.querySelector('#logout-button');
          expect(logoutButton).toBeInTheDocument();
        });
      });
    });
  });
});
