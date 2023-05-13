import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import PageCard from './PageCard'

function PageCards(props) {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3 }}
      spacing='40px'
    >
      <PageCard />
      <PageCard />
      <PageCard />
      <PageCard />
    </SimpleGrid>
  )
}

export default PageCards