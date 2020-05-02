import React, { useState, useRef } from 'react';
// import dynamic from 'next/dynamic';
import Dropzone from 'react-dropzone';
import { readFileAsync } from '@utilities/file';
import * as S from './style';

// const DynamicIcon = dynamic(() => import('@components/molecule/DynamicIcon'), { ssr: false });
export interface FileDropFormat { name: string; data: string | ArrayBuffer | null, size: number }

export const FILE_DROP_MAX_SIZE = 5242880;

type Props = {
  className?: string;
  onFileSelect?: (file: FileDropFormat) => void;
};

function FileDrop(props: Props) {
  const { className, onFileSelect } = props;
  const [file, setFile] = useState<FileDropFormat>();
  
  async function handleDrop(acceptedFiles: File[]) {
    if(!acceptedFiles || !Array.isArray(acceptedFiles)) return;

    const data = await readFileAsync(acceptedFiles[0]);
    const { name, size } = acceptedFiles[0];

    setFile({ name, data, size });
    onFileSelect && onFileSelect({ name, data, size });
  }

  const dropzoneRef = useRef(null);

  return (
    <Dropzone ref={dropzoneRef} accept='image/*' onDropAccepted={handleDrop} maxSize={FILE_DROP_MAX_SIZE} multiple={false}>
      {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
          <S.Container className={className} {...getRootProps()} isDragAccept={isDragAccept} isDragReject={isDragReject}>
            <input {...getInputProps()} />
            <S.FileNotif>or Drag 'n' drop an image</S.FileNotif>
          </S.Container>
        )
      }
    </Dropzone>
  );
}

export default FileDrop;
