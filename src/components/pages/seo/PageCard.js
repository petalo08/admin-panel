import { Button, Heading, Stack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { updateSeoById } from '../../../api/seo'

function PageCard(props) {
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
      const res = await updateSeoById(id, body)
      if (res.status === 200) { }
    }
    catch (err) { }
  }
  useEffect(() => {
    setName(props.name)
    setTitle(props.title)
    setDescription(props.description)
  }, [
    props.name,
    props.title,
    props.description
  ])
  return (
    <Stack
      my={5}
      bg='white'
      boxShadow='md'
      borderRadius='md'
      p='6'
      spacing='4'
      onClick={handleUpdate}
    >
      <Heading>
        {props.name}
      </Heading>
      <form onSubmit={handleUpdate}>
        <Stack direction='row' justify='space-around'>
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
          <Button variant='outline' colorScheme='blue' type='submit'>
            Update
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default PageCard