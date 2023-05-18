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
  const { data } = props;

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table variant="simple" width="full">
          <Thead>
            <Tr>
              <Th>Event Name</Th>
              <Th>Event Date</Th>
              <Th>Event Time</Th>
              <Th>Event Location</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{item.eventName}</Td>
                <Td>{item.eventDate}</Td>
                <Td>{item.eventTime}</Td>
                <Td>{item.eventLocation}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ContactsTable;
