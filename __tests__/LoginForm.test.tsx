import React from 'react';
import { render } from '@testing-library/react';

import Login from '../pages';

const renderLoginForm = () => {
    return render(<Login />);
};

describe('<LoginForm />', () => {
    test('should display a blank login form', async () => {
        const { findByTestId } = renderLoginForm();

        const loginForm = await findByTestId('login-form');

        expect(loginForm).toHaveFormValues({
            name: '',
            email: '',
            password: '',
        });
    });
});
