// MultiImageUpload.tsx
"use client";

import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "./use-toast";

export function MultiImageUpload({
  imageFiles,
  setImageFiles,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    setImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files || []);
    if (droppedFiles.length) {
      setImageFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  }

  function handleRemoveImage(index) {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }

  return (
    <div className={`${isCustomStyling ? "" : "max-w-md mx-auto"} w-full mt-4`}>
      <label className="text-lg font-semibold mb-2 block">Upload Images</label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-50 cursor-not-allowed" : ""} border-2 border-dashed rounded-lg p-4`}
      >
        <input
          type="file"
          disabled={isEditMode}
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          multiple
        />
        {!imageFiles.length ? (
          <label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : "cursor-pointer"} flex flex-col items-center justify-center h-32`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload images</span>
          </label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="space-y-2">
            {imageFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="w-8 h-8 text-primary mr-2" />
                  <p className="text-sm font-medium">{file.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}