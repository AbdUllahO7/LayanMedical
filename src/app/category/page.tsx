'use client'
import Categories from '@/components/Products/Categories'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CategoryPage = () => {
  const router = useRouter();
  
  return (
    <Provider store={store}>
      <div className='mt-[150px] mb-[150px] container'>
        <Button className='bg-lightColor hover:bg-logoColor' onClick={()=> router.back()}>
                <span><ArrowLeftCircle/></span>
                        Back
                </Button>
        <Categories/>
    </div>
    </Provider>
  )
}

export default CategoryPage;
