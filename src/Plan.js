import * as React from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function Plan({ data }) {
  return (
    <TableRow>
      <TableCell>{data.test_name}</TableCell>
      <TableCell>{data.browser}</TableCell>
      <TableCell>{data.instruction_count}</TableCell>
    </TableRow>
  );
}

export default Plan;