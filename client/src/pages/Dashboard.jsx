import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const Dashboard = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getproblems');
        console.log('API Response:', response); // Debugging
        if (response.data && response.data.problems) {
          setProblems(response.data.problems);
        } else {
          console.error('API response does not contain problems');
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchData();
  }, []);

  if (problems.length === 0) {
    return <div>Loading or No Problems Found...</div>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Problem List</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem._id}>
                <TableCell align='center'>
                  <Link to={`/solve/${problem._id}`}>{problem.name}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
