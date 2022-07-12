import { 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react'
import { Sale } from './Sale'

export const MainTable = ({ sales }) => (
  <TableContainer>
    <Table variant='simple'>
      <Thead position="relative">
        <Tr>
          <Th  />
          <Th isNumeric >price</Th>
          <Th >from</Th>
          <Th >to</Th>
          <Th >on</Th>
          <Th >when</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          sales.map(sale => <Sale key={sale.id} sale={sale} />)
        }
      </Tbody>
    </Table>
  </TableContainer>
)