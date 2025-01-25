'use client'; // This should be the very first line of your file

import { SignupFormDemo } from '@/components/admin/SignupFormDemo'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store';

const Admin = () => {

    return (
        <Provider store={store}>
            <SignupFormDemo />
        </Provider>
    )
}

export default Admin
