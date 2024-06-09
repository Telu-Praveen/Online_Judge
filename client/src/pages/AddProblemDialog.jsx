import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

const AddProblemDialog = ({ open, onClose, fetchProblems, problemToEdit }) => {
  const [name, setName] = useState('');
  const [statement, setStatement] = useState('');
  const [testcase, setTestcase] = useState([{ input: '', output: '' }]);
  const [constraints, setConstraints] = useState('');
  useEffect(() => {
    if (problemToEdit) {
      console.log('Editing Problem:', problemToEdit);
      setName(problemToEdit.name || '');
      setStatement(problemToEdit.statement || '');
      setTestcase(problemToEdit.testcase && problemToEdit.testcase.length > 0 ? problemToEdit.testcase : [{ input: '', output: '' }]);
      setConstraints(problemToEdit.constraints || '');
    } else {
      setName('');
      setStatement('');
      setTestcase([{ input: '', output: '' }]);
      setConstraints('');
    }
  }, [problemToEdit]);

  const handleSubmit = async () => {
    try {
      const newProblem = { name, statement, testcase, constraints };
      console.log('Submitting Problem:', newProblem);

      if (problemToEdit) {
        console.log('Updating Problem:', problemToEdit._id);
        const response = await axios.put(`http://13.232.66.171:8000/updateproblem/${problemToEdit._id}`, newProblem);
        console.log('Update Response:', response.data);
      } else {
        const response = await axios.post('http://13.232.66.171:8000/addproblem', newProblem);
        console.log('Add Response:', response.data);
      }

      fetchProblems();
      onClose();
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  const handleAddTestCase = () => {
    setTestcase([...testcase, { input: '', output: '' }]);
  };

  const handleRemoveTestCase = (index) => {
    const newTestcase = testcase.filter((_, idx) => idx !== index);
    setTestcase(newTestcase);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestcase = testcase.map((tc, idx) => 
      idx === index ? { ...tc, [field]: value } : tc
    );
    setTestcase(newTestcase);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{problemToEdit ? 'Edit Problem' : 'Add New Problem'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Statement"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          {testcase.map((tc, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2}>
              <TextField
                label="Input"
                value={tc.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                fullWidth
              />
              <TextField
                label="Output"
                value={tc.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                fullWidth
              />
              <IconButton onClick={() => handleRemoveTestCase(index)}>
                <Remove />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<Add />}
            onClick={handleAddTestCase}
            color="primary"
          >
            Add Test Case
          </Button>
          <TextField
            label="Constraints"
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {problemToEdit ? 'Update Problem' : 'Add Problem'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProblemDialog;
