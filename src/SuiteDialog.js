import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

const BROWSERS = [
  'chrome',
  'firefox',
  'safari',
  'edge'
];

const PLAN_DEFAULTS = {
  test_name: '',
  browser: BROWSERS[0],
  instruction_count: 1
};

function SuiteDialog({ data, open, onClose }) {
  const [name, setName] = React.useState(data.test_suite_name);
  const [plans, setPlans] = React.useState(data.test_plans);

  const save = React.useCallback(() => {
    data.test_suite_name = name;
    data.test_plans = plans;
    console.log(data);
  }, [data, name, plans]);

  const updatePlan = React.useCallback((index, plan) => {
    setPlans(plans.map((p, i) => i === index ? plan : p));
  }, [plans, setPlans]);

  const deletePlan = React.useCallback((index) => {
    setPlans(plans.slice(0, index).concat(plans.slice(index + 1)));
  }, [plans, setPlans]);

  const addPlan = React.useCallback((index) => {
    setPlans([...plans, {...PLAN_DEFAULTS}]);
  }, [plans, setPlans]);

  const validateName = React.useCallback(() => {
    return name.length > 0;
  }, [name]);

  const validatePlanName = React.useCallback((index) => {
    return plans[index].test_name.length > 0;
  }, [plans]);

  const validatePlanBrowser = React.useCallback((index) => {
    return BROWSERS.includes(plans[index].browser);
  }, [plans]);

  const validatePlanInstructions = React.useCallback((index) => {
    return typeof plans[index].instruction_count === 'number' && plans[index].instruction_count > 0;
  }, [plans]);

  const validatePlan = React.useCallback((index) => {
    return validatePlanName(index)
      && validatePlanBrowser(index)
      && validatePlanInstructions(index);
  }, [
    validatePlanName,
    validatePlanBrowser,
    validatePlanInstructions
  ]);

  const validatePlans = React.useCallback(() => {
    for (let i = 0; i < plans.length; i++) {
      if (!validatePlan(i)) {
        return false;
      }
    }
    return true;
  }, [plans, validatePlan]);

  const validateForm = React.useCallback(() => {
    return validateName() && validatePlans();
  }, [validateName, validatePlans]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
    >
      <DialogTitle>Edit {data.test_suite_name}</DialogTitle>
      <DialogContent>
        <Box component="form">
          <div>
            <TextField
              error={!validateName()}
              helperText={!validateName() ? 'Can not be empty' : null}
              label="Name"
              defaultValue={data.test_suite_name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            Plans
            <Button onClick={addPlan}>Add</Button>
            <TableContainer>
              <Table>
                <TableBody>
                  {plans.map((plan, index) => 
                    <TableRow key={plan.test_name + index}>
                      <TableCell>
                        <TextField
                          error={!validatePlanName(index)}
                          helperText={!validatePlanName(index) ? 'Can not be empty' : null}
                          label="Name"
                          size="small"
                          defaultValue={plan.test_name}
                          onChange={(event) => updatePlan(index, {...plan, test_name: event.target.value})}
                        />
                      </TableCell>
                      <TableCell>
                        <InputLabel id={`browser-select-label-${index}`}>Browser</InputLabel>
                        <Select
                          error={!validatePlanBrowser(index)}
                          labelId={`browser-select-label-${index}`}
                          value={plan.browser}
                          label="Browser"
                          size="small"
                          onChange={(event) => updatePlan(index, {...plan, browser: event.target.value})}
                        >
                          {BROWSERS.map(browser => 
                            <MenuItem value={browser} key={browser}>
                              {browser[0].toLocaleUpperCase() + browser.slice(1)}
                            </MenuItem>
                          )}
                        </Select>
                        {!validatePlanBrowser(index) && <FormHelperText>
                          Unknown browser
                        </FormHelperText>}
                      </TableCell>
                      <TableCell>
                        <TextField
                          error={!validatePlanInstructions(index)}
                          helperText={!validatePlanInstructions(index) ? 'Has to be number, Can not be zero' : null}
                          label="Instructions"
                          size="small"
                          type="number"
                          defaultValue={plan.instruction_count}
                          onChange={(event) => updatePlan(index, {...plan, instruction_count: Number(event.target.value)})}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={plans.length === 1}
                          onClick={() => deletePlan(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={() => {
            save();
            onClose();
          }}
          disabled={!validateForm()}
        >Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuiteDialog;