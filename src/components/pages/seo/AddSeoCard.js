import React, { useState } from 'react'
import { createSeo } from '../../../api/seo'

function AddSeoCard() {
  const toast = useToast()
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const handleSubmit = async () => {
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
      <form
        onSubmit={handleSubmit}
      >
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Page Name'
        />
        <input type='text' placeholder='Page Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input type='text' placeholder='Page Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input type='submit' value='Create' />
      </form>
    </div>
  )
}

export default AddSeoCard