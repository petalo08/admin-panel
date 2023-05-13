import { Stack } from '@chakra-ui/react'
import React from 'react'
import PageCard from './PageCard'

function PageCards(props) {
  const {data} = props
  return (
    <Stack
      spacing='40px'
    >
      <PageCard />
      <PageCard />
      <PageCard />
      <PageCard />
    </Stack>
  )
}

export default PageCards