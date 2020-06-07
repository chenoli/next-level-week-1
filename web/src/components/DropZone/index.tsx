import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface IDropZone {
  onFileUploaded: (file: File) => void,
}

const DropZone: React.FC<IDropZone> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt="Point Thumbnail" />
          : isDragActive ?
            <p>
              <FiUpload />
              solte o arquivo aqui (:
            </p> :
            <p>
              <FiUpload />
              arraste um arquivo aqui, ou clique para selecionar
            </p>
      }
    </div>
  );
}

export default DropZone;
