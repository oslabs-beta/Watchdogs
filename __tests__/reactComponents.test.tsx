import React from 'react';
import { fireEvent, render, RenderResult, waitFor, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../client/Components/Login';
import Signup from '../client/Components/Signup';
import Home from '../client/Components/Home';

import { ResponseDataType } from '../client/types';

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

    test('Renders a Setup an Arn Link', () => {
      const arnSetup = app.container.querySelector('#arn-setup');
      expect(arnSetup).toBeInTheDocument();
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

    test('Renders an empty Error Display area', () => {
      const errorDisplay = app.container.querySelector('#user-already-exists');
      expect(errorDisplay).toBeInTheDocument();
      expect(errorDisplay).toHaveTextContent('');
    });

    test("Displays 'username already exists' if username already exists", async () => {
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

    test('Renders an empty Error Display area', () => {
      const errorDisplay = app.container.querySelector('#invalid-display');
      expect(errorDisplay).toBeInTheDocument();
      expect(errorDisplay).toHaveTextContent('');
    });

    test("Displays 'invalid username or password' if invalid input", async () => {
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
      });

      test('Renders a Nav Bar component', () => {
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
              } as ResponseDataType),
          } as any)
        );

        const navbar = app.getByRole('navigation');
        expect(navbar).toBeInTheDocument();
      });

      test('Displays Logo, Functions, Warm list, and Username in Nav Bar', async () => {
        await waitFor(() => {
          const functionsLink = app.getByText('Functions');
          expect(functionsLink).toBeInTheDocument();

          const warmLink = app.getByText('Warm List');
          expect(warmLink).toBeInTheDocument();

          const usernameLink = app.getByText('testusername');
          expect(usernameLink).toBeInTheDocument();
        });
      });
    });

    // describe('Loading Display', () => {});

    describe('FunctionsList', () => {
      beforeEach(() => {
        app = render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
      });
      test('Renders a Functions List container', () => {
        const functionsList = app.container.querySelector('#functions-list');
        expect(functionsList).toBeInTheDocument();
      });

      test('Renders a Refresh Button, along with Timeframe, Increment, and Filter Results Selectors', () => {
        const refreshButton = app.container.querySelector('#refresh-button');
        expect(refreshButton).toBeInTheDocument();

        const timeframe = app.container.querySelector('#timeframe-selector');
        expect(timeframe).toBeInTheDocument();

        const increment = app.container.querySelector('#increment-selector');
        expect(increment).toBeInTheDocument();
      });

      test('Renders a Function component if a function is present', async () => {
        await waitFor(() => {
          const testFunction = app.container.querySelector('#testfunctionname');
          expect(testFunction).toBeInTheDocument();
        });
      });

      // test("Displays 'No Functions Found' if there are no functions present", () => {});

      test('Function component contains a Function Name, Chart, and Error Logs Buttons', async () => {
        await waitFor(() => {
          const functionName = app.getByText(`"testfunctionname"`);
          expect(functionName).toBeInTheDocument();

          const chart = app.container.querySelector('#testfunctionname-chart');
          expect(chart).toBeInTheDocument();

          const errorLogsPdf = app.getByRole('button', {
            name: 'As PDF',
          });
          expect(errorLogsPdf).toBeInTheDocument();

          const errorLogsSpreadsheet = app.getByRole('button', {
            name: 'As Spreadsheet',
          });
          expect(errorLogsSpreadsheet).toBeInTheDocument();
        });
      });

      // test("Function have a classname of "errorfunction", and have a red border if errors are present() => {});
    });

    // describe('User Info', () => {
    //   beforeEach(() => {
    //     app = render(
    //       <MemoryRouter>
    //         <Home />
    //       </MemoryRouter>
    //     );
    //   });
    //   test('Renders a User Info container', async () => {
    //     const userInfoContainer = app.container.querySelector('#user-info');
    //     expect(userInfoContainer).toBeInTheDocument();
    //   });
    // });
  });
});
