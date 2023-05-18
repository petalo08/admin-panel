import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";

function ContactsTable(props) {
    const {data} = props
    console.log(data)
    return (
        <div>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Event Name</Th>
                            <Th>Event Date</Th>
                            <Th>Event Time</Th>
                            <Th>Event Location</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, index) => {
                            
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ContactsTable