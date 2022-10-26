import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';

import Suite from './Suite';

function App({ endpoint }) {
  const [data, setData] = React.useState([]);
  
  const fetchData = React.useCallback(async () => {
    const response = await fetch(endpoint);
    setData(await response.json());
  }, [endpoint, setData]);
  
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box>
          {data.length
            ? <List>
                {data.map(suiteData => 
                  <Suite data={suiteData} key={suiteData.id} />
                )}
              </List>
            : ''
          }
        </Box>
      </Container>
    </>
  );
}

export default App;