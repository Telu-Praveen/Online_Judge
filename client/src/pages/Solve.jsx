import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography,Select, MenuItem, Button, TextField, Box,Grid, Paper } from '@mui/material';
import CustomMonacoEditor from './CustomMonacoEditor.jsx';
import { useAuth } from '../components/Auth.jsx';

const Solve = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [testStatus, setTestStatus] = useState('');
  const [testcase, setTestCase] = useState('null');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const email=localStorage.getItem('email');
        const response = await axios.get(`http://13.232.66.171:8000/getproblem/${id}`,{
          params:{
            email:email
          }
        });
        setTestCase(response.data.problem.testcase);
        setCode(response.data.problem.code)
        setLanguage(response.data.problem.language);
        console.log(testcase);
        setProblem(response.data.problem);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProblem();
  }, [id]);
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return (<div>
      <p className="mt-10 text-center text-sm text-gray-500">
        Dear User! Please {' '}
        <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"  >
          Login
        </a></p>
    </div>
    );
  }
  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const handleSubmit = async () => {
    try {
      const email=localStorage.getItem('email')
      const response = await axios.post(`http://13.232.66.171:8000/submit/${id}`, { code, language, input,email });
      console.log(response.data.pass);
      //setOutput(response.data.output);
      setTestStatus(response.data.pass);
    } catch (error) {
      console.error(error);
    }
  };

  const handlerun = async () => {
    try {
      const response = await axios.post('http://13.232.66.171:8000/run', { code, language, input });
      console.log(response)
      setOutput(response.data.output);
      setTestStatus(response.data.testStatus);
    } catch (error) {
      console.error(error);
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={1} md={4}>
        <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
          <Typography variant="h4">{problem.name}</Typography>
          <Typography variant="body1" style={{ whiteSpace: 'normal' }}>{problem.statement}</Typography>
          <Typography variant="h6" style={{ marginTop: '16px' }}>Test Cases</Typography>
          <p>Sample Input1</p>
          <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{testcase[0].input}</Typography>
          <p>Sample Output1</p>
          <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{testcase[0].output}</Typography>
          <p>Sample Input2</p>
          <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{testcase[1].input}</Typography>
          <p>Sample Output2</p>
          <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{testcase[1].output}</Typography>
          <Typography variant="h6" style={{ marginTop: '16px' }}>Constraints</Typography>
          <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{problem.constraints}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Select value={language} onChange={handleLanguageChange}>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="java">Java</MenuItem>
            </Select>
          </Box>
          <Box>
          <CustomMonacoEditor
            width="100%"
            height="400px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
          />
          </Box>
          <Box mt={2}>
            <TextField
              label="Input"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
          <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handlerun} style={{ marginRight: '8px' }}>
              run
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>

          </Box>
          <Box mt={2}>
            <Typography variant="h6">Output:</Typography>
            <Paper style={{ padding: '16px', backgroundColor: '#f5f5f5', minHeight: '50px' }}>
              <Typography>{output}</Typography>
            </Paper>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">Test Cases Status:</Typography>
            <Paper style={{ padding: '16px', backgroundColor: '#f5f5f5', minHeight: '50px' }}>
              <Typography>{testStatus}</Typography>
            </Paper>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Solve;
