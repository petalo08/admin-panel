import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast
} from "@chakra-ui/react";

function AdminUsersTable(props) {
  const toast = useToast()
  const { data } = props;
  return (
    <TableContainer
      shadow={'md'}
      rounded={'md'}>
      <Table size="md" variant="simple">
        <Thead bg="#e9fffb">
          <Tr>
            <Th color="black">Name</Th>
            <Th color="black">Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default AdminUsersTable