import React, { useState } from 'react'
import { createSeo } from '../../../api/seo'
import { useToast } from '@chakra-ui/react'

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
      if (res.status === 200) {
        console.log(res.data)
        toast({
          title: "Page Created.",
          description: "We've created a new page for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
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