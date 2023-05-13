import React, { useState } from 'react'
import { createSeo } from '../../../api/seo'

function AddSeoPage() {
    const toast = useToast()
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const handleUpdate = async () => {
      let body = {
        title: title,
        metaDescription: description,
        pageName: name
      }
      try {
        const res = await createSeo(body)
        if (res.status === 200) { }
      }
      catch (err) { }
    }
    return (
        <div>
            
        </div>
    )
}

export default AddSeoPage