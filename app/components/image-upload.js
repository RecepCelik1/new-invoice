import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineCloudUpload, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlinePicture } from 'react-icons/ai';

const Uploader = ({ header, message, format, onFileUploaded }) => {
    const [fileUrl, setFileUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        validateFile(selectedFile);
    };

    const validateFile = (selectedFile) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!selectedFile) {
            return;
        }

        if (!validTypes.includes(selectedFile.type)) {
            setErrorMessage('Invalid file type. You can only upload JPG, JPEG and PNG files.');
            setSuccess(false);
            return;
        }

        if (selectedFile.size > maxSize) {
            setErrorMessage('File size cannot be larger than 5 MB.');
            setSuccess(false);
            return;
        }

        const fileUrl = URL.createObjectURL(selectedFile);
        setFileUrl(fileUrl);
        setErrorMessage('');
        setSuccess(true);

        if (onFileUploaded) {
            onFileUploaded(fileUrl);
        }

        return () => URL.revokeObjectURL(fileUrl);
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            validateFile(droppedFiles[0]);
        }
    };

    // Cleanup URL on component unmount
    useEffect(() => {
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileUrl]);

    return (
        <div 
            className={`w-full text-center border ${dragging ? 'border-blue-600 bg-gray-100' : 'border-dashed border-gray-400 bg-gray-50'} p-6 rounded-lg cursor-pointer hover:border-gray-600 hover:bg-gray-200 transition-colors duration-300 flex flex-col items-center justify-center`}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label className="block text-gray-700 mb-2 font-semibold">{header}</label>
            <div className='flex flex-col items-center justify-center'>
                <AiOutlineCloudUpload size={50} className="text-gray-400 mb-2" />
                <p className="text-gray-600 text-sm">{message}</p>
                <p className="text-gray-600 text-sm">{format}</p>
            </div>
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/jpeg, image/jpg, image/png"
            />
            {errorMessage && (
                <div className="text-red-500 mt-2 flex items-center">
                    <AiOutlineCloseCircle className="mr-2" />
                    {errorMessage}
                </div>
            )}
            {success && (
                <div className="text-green-500 mt-2 flex items-center">
                    <AiOutlineCheckCircle className="mr-2" />
                    Logo uploaded successfully!
                </div>
            )}
            {fileUrl && (
                <div className="mt-4 flex items-center justify-center">
                    <div className="relative border-4 border-gray-300 rounded-lg p-2 bg-white shadow-lg">
                        <AiOutlinePicture size={50} className="absolute top-2 right-2 text-gray-400" />
                        <Image src={fileUrl} alt="Uploaded Image" width={150} height={150} className="rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Uploader;
