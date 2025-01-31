'use client'

import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react"
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "./use-toast";

function ImageUpload({
    imageFile ,
    setImageFile ,
    setUploadedImageUrl,
    setImageLoadingState,
    imageLoadingState,
    isEditMode,
    isCustomStyling = false,
    urlToUpload,
}) {

    const inputRef = useRef(null)

    function handleImageFileChange(event){

        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
        
    }

    function handleDragOver(event){
        event.preventDefault();
    }

    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }   

    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value = "";
    }
    }
    useEffect(() => {
        console.log('URL to upload:', urlToUpload); // Debugging
        console.log('Image File:', imageFile); // Debugging
        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);
    

    async function uploadImageToCloudinary() {
        try {
            setImageLoadingState(true);
            const data = new FormData();
            data.append('my_file', imageFile);
            const response = await axios.post(urlToUpload, data);
            
            if (response.data?.success) {
                setUploadedImageUrl(response.data.result.url);
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error("Error uploading image:", error); // Log the error
            toast({ title: "Image upload failed", variant: 'destructive' });
        } finally {
            setImageLoadingState(false);
        }
    }
    

    useEffect(() => {
        if(imageFile !== null ) uploadImageToCloudinary()
    } , [imageFile])


    return (
        <div className={`${isCustomStyling ? '' : 'max-w-md mx-auto'} w-full  mt-4`}>
            <label className="text-lg  font-semibold mb-2 block">Upload Image </label>

            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? 'opacity-5' : ''}border-2 border-dashed rounded-lg p-4 `}>
                <input type="file" disabled={isEditMode} id = "image-upload" className="hidden"  ref = {inputRef} onChange = {handleImageFileChange}/>
                {
                    !imageFile ?( 
                    <label htmlFor="image-upload" className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}>
                        <UploadCloudIcon className="2-10 h-10 text-muted-foreground mb-2"/>
                        <span>Drag & drop or click to upload image</span>
                    </label> 
                    )
                    : (
                        imageLoadingState ? 
                        <Skeleton className="h-10 bg-gray-100"/> : 
                    <div className="flex items-center justify-between">
                        <div className="flex items-center ">
                            <FileIcon className="w-8 text-primary mr-2 h-8"/>
                        </div>
                        <p className="text-sm font-medium">{imageFile?.name}</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>)
                }
            </div>
        </div>
    )
}
ImageUpload.propTypes = {
    imageFile: PropTypes.instanceOf(File),
    setImageFile: PropTypes.func,
    uploadedImageUrl: PropTypes.string,
    setUploadedImageUrl: PropTypes.func,
    setImageLoadingState: PropTypes.func,
    imageLoadingState: PropTypes.bool,
    isEditMod : PropTypes.any,
};
export default ImageUpload