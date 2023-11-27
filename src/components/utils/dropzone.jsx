import { useDropzone } from 'react-dropzone';

export default function Dropzone({ open }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className='dropzone'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your image here</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}
