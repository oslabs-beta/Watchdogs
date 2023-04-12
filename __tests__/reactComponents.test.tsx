import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

import App from '../client/App';
import Login from '../client/Components/Login';
import Signup from '../client/Components/Signup';

describe('React Component Testing', () => {
  describe('SignUp Page', () => {
    test('Renders a signup container', () => {
      render(<App />);
      const linkElement = screen.getByTestId('signup-container');
      expect(linkElement).toBeInTheDocument;
    });

    test('Should render a Username and Password fields', () => {});

    test('Should render a submit button', () => {});

    test("Should display 'Username already exists' if username already exists", () => {});

    test("Should redirect to '/Home' on succsessful signup", () => {});
  });

  describe('Login Page', () => {
    test('Should render a login container', () => {});

    test('Should render Username and Password fields', () => {});

    test('Should render a submit button', () => {});

    test("Should display 'invalid username or password' if invalid input", () => {});

    test("Should redirect to '/Home' on sucsessfull login", () => {});
  });

  describe('Home Page', () => {
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
