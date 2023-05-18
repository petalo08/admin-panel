import { Stack } from '@chakra-ui/react'
import React from 'react'
import PageCard from './PageCard'

function PageCards(props) {
  const { data } = props
  console.log(data)
  return (
    <Stack spacing='40px'>
      {data.map((item, index) => {
        return (
          <PageCard key={index} data={item} />
        )
      })}
    </Stack>
  )
}

export default PageCards