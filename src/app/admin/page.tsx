'use client'; // This should be the very first line of your file

import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store';
import { Toaster } from '@/components/ui/toaster';
import { SignInForm } from '@/components/admin/SignInFormDemo';

const page = () => {

    return (
        <Provider store={store}>
            <SignInForm />
            <Toaster/>
        </Provider>
    )
}

export default page
