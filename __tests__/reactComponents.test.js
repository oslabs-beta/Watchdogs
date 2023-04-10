import React from 'React';
import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';

import App from '../client/App.';

describe('React Component Testing', () => {

    describe('SignUp Page', () => {

        it('Should render a signup container', ()=> {
            
        });

        it('Should render a Username, Password, and Confirm Password fields', ()=> {
            
        });

        it('Should render a submit button', ()=> {
            
        });

        it("Should display 'Username already exists' if username already exists", ()=> {
            
        });

        it("Should redirect to '/Home' on succsessful signup", ()=> {
            
        });

    })

    describe('Login Page', () => {

        it('Should render a login container', ()=> {
            
        });

        it('Should render Username and Password fields', ()=> {
            
        });
    
        it('Should render a submit button', ()=> {
            
        });

        it("Should display 'invalid username or password' if invalid input", ()=> {
            
        });

        it("Should redirect to '/Home' on sucsessfull login", ()=> {
            
        });

    })

    describe('Home Page', ()=> {

        it('Should render a header component', ()=> {
            
        });

        it('Should render a Functions Container', ()=> {
        
        });

        describe('Header', () => {

            it('Should display the users name in header', ()=> {
                
            });

            xit('Should diplay Functions, Warm list, and Error routes', ()=> {
            
            });
    
        })
        
        describe('Functions Containter', ()=> {
            
            it('Should render a function component if a function is present', ()=> {
            
            });

            it("Should display 'No Functions Found' if there are no functions present", ()=> {
            
            });
            
        });

    })

})