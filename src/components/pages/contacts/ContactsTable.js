import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function ContactsTable(props) {
  const { data } = props
  console.log(data) 

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table variant="simple" width="full">
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Message</Th>
              <Th>Name</Th>
              <Th>Phone</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{item.email}</Td>
                <Td>{item.message}</Td>
                <Td>{item.name}</Td>
                <Td>{item.phone}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ContactsTable;
