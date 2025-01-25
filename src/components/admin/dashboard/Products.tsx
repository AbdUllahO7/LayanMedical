import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Products = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-between w-full items-center'>
                <h2 className='font-bold text-2xl'>Products</h2>
                <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New Product</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Make changes  here. Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                        Title
                        </Label>
                        <Input
                            id="title"
                            defaultValue="Pedro Duarte"
                            className="col-span-12 w-[270px]"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                        id="description"
                        defaultValue="@peduarte"
                        className="col-span-3"
                        />
                    </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Products
