import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, RenderResult, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../client/App';
import Login from '../client/Components/Login';
import Signup from '../client/Components/Signup';

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
      const linkElement = app.container.querySelector('#signup-container');
      expect(linkElement).toBeInTheDocument();
    });

    test('Should render a Username and Password fields', () => {
      const usernameElement = app.container.querySelector('#username-field');
      const passwordElement = app.container.querySelector('#password-field');
      expect(usernameElement).toBeInTheDocument();
      expect(passwordElement).toBeInTheDocument();
    });

    test('Should render a submit button', () => {
      const signupButton = app.getByRole('button', {
        name: 'Signup',
      });
      expect(signupButton).toBeInTheDocument();
    });

    // test("Should display 'Username already exists' if username already exists", () => {});

    // test("Should redirect to '/Home' on succsessful signup", () => {});
  });

  xdescribe('Login Page', () => {
    test('Should render a login container', () => {});

    test('Should render Username and Password fields', () => {});

    test('Should render a submit button', () => {});

    test("Should display 'invalid username or password' if invalid input", () => {});

    test("Should redirect to '/Home' on sucsessfull login", () => {});
  });

  xdescribe('Home Page', () => {
    test('Should render navbarer component', () => {});

    test('Should render a Functions Container', () => {});

    describe('Header', () => {
      test('Should display the users name in header', () => {});

      xit('Should diplay Functions, Warm list, and Error routes', () => {});
    });

    describe('Functions Containter', () => {
      test('Should render a function component if a function is present', () => {});

      test("Should display 'No Functions Found' if there are no functions present", () => {});
    });
  });
});

// function renderLoginForm(props: Partial<Props> = {}) {
//   // const defaultProps: Props = {
//   //   onPasswordChange() {
//   //     return;
//   //   },
//   //   onRememberChange() {
//   //     return;
//   //   },
//   //   onUsernameChange() {
//   //     return;
//   //   },
//   //   onSubmit() {
//   //     return;
//   //   },
//   //   shouldRemember: true,
//   // };
//   return render(<LoginForm {...defaultProps} {...props} />);
// }

// test('should display a blank login form, with remember me checked by default', async () => {
//   const { findByTestId } = renderLoginForm();

//   const loginForm = await findByTestId('login-form');

//   expect(loginForm).toHaveFormValues({
//     username: '',
//     password: '',
//     remember: true,
//   });
// });
