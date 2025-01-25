'use client'
import { SidebarDemo } from '@/components/admin/dashboard/SidebarDemo'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../../store'
import { Toaster } from '@/components/ui/toaster'

const Dashboard = () => {
    return (
        <Provider store={store}>
        <div className='mt-[100px] w-full mb-[100px]'>
                <SidebarDemo/>
                <Toaster/>

        </div>
        </Provider>

    )
}

export default Dashboard
