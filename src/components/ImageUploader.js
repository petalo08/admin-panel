import React from 'react'
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function ImageUploader() {
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!file) return

        const path = `${file.name}`
        const { data, error } = await supabase.storage.from('images').upload(path, file)

        if (error) {
            console.error(error)
        } else {
            console.log('File uploaded successfully:', data)
            const { data: url, error: err } = supabase.storage.from('images').getPublicUrl(path)
            console.log(url)
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default ImageUploader