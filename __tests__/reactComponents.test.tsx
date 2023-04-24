import React from 'react';
// import userEvent from '@testing-library/user-event';
import { fireEvent, render, RenderResult, waitFor, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../client/Components/Login';
import Signup from '../client/Components/Signup';
import Home from '../client/Components/Home';
import { mock } from 'node:test';

describe('React Component Testing', () => {
  let app: RenderResult;

  describe('SignUp Page', () => {
    beforeEach(() => {
      // const history = createMemoryHistory();
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
      const password = app.container.querySelector('#signup-password');
      const arn = app.container.querySelector('#arn');
      const region = app.container.querySelector('#region-selector');

      expect(username).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(arn).toBeInTheDocument();
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

    xtest("Should redirect to '/' on succsessful signup", async () => {
      // global.fetch = jest.fn(() =>
      //   Promise.resolve({
      //     json: () => Promise.resolve({}),
      //   } as any)
      // );
      // jest.mock('react-router-dom', () => {
      //   return {
      //     ...jest.requireActual('react-router-dom'),
      //     useNavigate: jest.fn(),
      //   };
      // });
      // const username = app.container.querySelector('#signup-username') as HTMLInputElement;
      // fireEvent.change(username, { target: { value: 'test' } });
      // const password = app.container.querySelector('#signup-password') as HTMLInputElement;
      // fireEvent.change(password, { target: { value: 'test' } });
      // const arn = app.container.querySelector('#arn') as HTMLInputElement;
      // fireEvent.change(arn, { target: { value: 'test' } });
      // fireEvent.click(
      //   app.getByRole('button', {
      //     name: 'Signup',
      //   })
      // );
      // await waitFor(() => {
      // const sucsess = app.getByText('Username already exists');
      // expect(sucsess).toBeInTheDocument();
      // });
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

    // test("Displays 'invalid username or password' if invalid input", async () => {});
    // test("Should redirect to '/' on sucsessfull login", () => {});
  });

  // describe('Home Page', () => {
  //   beforeEach(() => {
  //     app = render(
  //       <MemoryRouter>
  //         <Home />
  //       </MemoryRouter>
  //     );
  //   });
  //   describe('Nav Bar', () => {
  //     test('Renders a Nav Bar component', () => {});

  //     test('Displays Logo, Functions, Warm list, and Username in Nav Bar', () => {});
  //   });

  //   // describe('Functions Containter', () => {
  //   //   test('Should render a Functions Container', () => {});

  //   //   test('Renders a Function component if a function is present', () => {});

  //   //   // test("Displays'No Functions Found' if there are no functions present", () => {});
  //   // });
  // });
});
