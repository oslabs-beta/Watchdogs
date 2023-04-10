import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render , waitFor} from '@testing-library/react';

import App from '../client/App';

describe('React Component Testing', () => {

    describe('SignUp Page', () => {

        test('Should render a signup container', async ()=> {

        });

        test('Should render a Username, Password, and Confirm Password fields', async ()=> {
            
        });

        test('Should render a submit button', async ()=> {
            
        });

        test("Should display 'Username already exists' if username already exists", async ()=> {
            
        });

        test("Should redirect to '/Home' on succsessful signup", async ()=> {
            
        });

    })

    describe('Login Page', () => {

        test('Should render a login container', async ()=> {
            
        });

        test('Should render Username and Password fields', async ()=> {
            
        });
    
        test('Should render a submit button', async ()=> {
            
        });

        test("Should display 'invalid username or password' if invalid input", async ()=> {
            
        });

        test("Should redirect to '/Home' on sucsessfull login", async ()=> {
            
        });

    })

    describe('Home Page', ()=> {

        test('Should render a header component', async ()=> {
            
        });

        test('Should render a Functions Container', async ()=> {
        
        });

        describe('Header', () => {

            test('Should display the users name in header', async ()=> {
                
            });

            xit('Should diplay Functions, Warm list, and Error routes', async ()=> {
            
            });
    
        })
        
        describe('Functions Containter', ()=> {
            
            test('Should render a function component if a function is present', async ()=> {
            
            });

            test("Should display 'No Functions Found' if there are no functions present", async ()=> {
            
            });
            
        });

    })

})