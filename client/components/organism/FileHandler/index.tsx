import React, { useState, useRef, useCallback } from 'react';
// import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import * as S from './style';
import { readFileAsync } from '@utilities/file';

// const DynamicIcon = dynamic(() => import('@components/molecule/DynamicIcon'), { ssr: false });

type Props = {
  className?: string;
};

function FileHandler(props: Props) {
  const { className } = props;
  const [files, setFiles] = useState<{ name: string, data: string | ArrayBuffer | null }[]>([]);
  
  const handleDrop = useCallback(async acceptedFiles => {
    if(!acceptedFiles || !Array.isArray(acceptedFiles)) return;

    const fileData = [];

    for (const file of acceptedFiles) {
      const { name } = file as File;
      const data = await readFileAsync(file);
      fileData.push({ name, data});
    }

    setFiles([...files, ...fileData]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop, accept: 'image/jpeg, image/png, image/webp' });

  const containerRef = useRef(null);

  return (
    <div {...getRootProps()} style={{paddingTop: '10rem'}}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
}

export default FileHandler;
