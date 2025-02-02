'use client'; // This should be the very first line of your file

import { SignupFormDemo } from '@/components/admin/SignupFormDemo'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store';
import { Toaster } from '@/components/ui/toaster';

const page = () => {

    return (
        <Provider store={store}>
            <SignupFormDemo />
            <Toaster/>
        </Provider>
    )
}

export default page
