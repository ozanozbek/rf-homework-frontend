import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

import Plan from './Plan';
import SuiteDialog from './SuiteDialog';

function Suite({ data }) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  return (
    <ListItem>
      <SuiteDialog data={data} open={editDialogOpen} onClose={() => setEditDialogOpen(false)} />
      <Box sx={{ flexGrow: 1 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {`${data.test_suite_name} (${data.test_plans.length} ${data.test_plans.length === 1 ? 'test' : 'tests'})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button onClick={() => setEditDialogOpen(true)}>Edit</Button>
            <TableContainer>
              <Table>
                <TableBody>
                  {data.test_plans.map(planData => 
                    <Plan data={planData} key={planData.test_name} />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Box>
    </ListItem>
  );
}

export default Suite;