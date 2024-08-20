import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import AddProblemDialog from './AddProblemDialog';

import { useAuth } from '../components/Auth.jsx'

const ProblemDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate("/")
  };
  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://13.127.150.73:8000/getproblems');
      setProblems(response.data.problems);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  const deleteProblem = async (id) => {
    try {
      await axios.delete(`http://13.127.150.73:8000/deleteproblem/${id}`);
      fetchProblems();
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  const handleDialogOpen = () => {
    setProblemToEdit(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setProblemToEdit(null);
  };

  const handleEditProblem = async (problem) => {
    console.log('Problem to Edit:', problem);
    const response = await axios.get(`http://13.127.150.73:8000/getproblem/${problem._id}`);
    console.log("response")
    problem.statement = response.data.problem.statement;
    problem.testcase = response.data.problem.testcase;
    problem.constraints = response.data.problem.constraints;
    setProblemToEdit(problem);
    setIsDialogOpen(true);
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
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" flexGrow={1} justifyContent="space-between" color="Black">
            <Typography variant="h5">Problem List</Typography>
            
            <Button variant="contained" color="primary" onClick={handleDialogOpen} >
              Add Problem
            </Button>
            <Button variant="contained" color="primary" onClick={handleLogout}>
          Log out
        </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Table>
        <TableBody>
          {problems.map((problem) => (
            <TableRow key={problem._id}>
              <TableCell>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p align="left">{problem.name}</p>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: '8px' }}
                      onClick={() => handleEditProblem(problem)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteProblem(problem._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddProblemDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        fetchProblems={fetchProblems}
        problemToEdit={problemToEdit}
      />
    </div>
  );
};

export default ProblemDashboard;
