import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "cloudinary-react";
import styles from "../styles/Image.module.css";


export default function ImageContainer({run, user,uploadedFiles, setUploadedFiles}) {
    const userRef = useRef();
    const runRef = useRef();
    // const [uploadedFiles, setUploadedFiles] = useState([
    // ]);

    userRef.current = user;
    runRef.current = run;

console.log(uploadedFiles)
  const onDrop = useCallback((acceptedFiles) => {
      const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
      
      acceptedFiles.forEach((acceptedFile) => {

          const formData = new FormData();
          formData.append("file", acceptedFile);
          formData.append(
              "upload_preset",
              process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
              );
              fetch(url, {
                  method: "POST",
                  body: formData,
                })
                .then( response => response.json() )
                .then(data => {

                    console.log(data)
                    const photoObj = {
                        user_id: userRef.current.id,
                        run_id: runRef.current.id,
                        photo: data.public_id}
                        console.log(photoObj)
                        fetch(`${process.env.REACT_APP_BACKEND_URL}/photos`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(photoObj),
                        })
                        .then(r => r.json() )
                        .then(newPhoto => {
                            console.log(newPhoto)
                            setUploadedFiles((old) => [...old, newPhoto]);
                    }) })
                
    });
  }, []);

  function handleClick(file){
    const token = localStorage.getItem("token");
    console.log("click")
    if (window.confirm('Are you sure you wish to delete this image?')){ 
      
      fetch(`${process.env.REACT_APP_BACKEND_URL}/photos/${file.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const updatedImages = uploadedFiles.filter(image => image.id !== file.id)
      setUploadedFiles(updatedImages)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
      >
        <input {...getInputProps()} />
        Image Alter
      </div>

      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.id}>
            <button onClick={()=>handleClick(file)}>Delete this Image</button>
            <Image
              cloudName={process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              publicId={file.photo}
              width="100"
              crop="scale"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

