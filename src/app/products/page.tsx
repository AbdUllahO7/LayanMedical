'use client'

import { BentoGridDemo } from '@/components/BentoGridDemo'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Page = () => {
        const router = useRouter()
    
    return (
       <Provider store={store}>
        <div className='h-full flex w-full justify-center items-start mt-[100px]'>
            <div className="">
                <Button  className='bg-lightColor hover:bg-logoColor' onClick={()=> router.back()}>
                <span><ArrowLeftCircle/></span>
                Back
            </Button>
            </div>
            <BentoGridDemo showButton={false}/>
        </div>
       </Provider>
    )
}

export default Page
