import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import {useAuth} from '../components/Auth.jsx'
import {Typography,AppBar,Toolbar,Button,Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,} from '@mui/material';

const Dashboard = () => {
  const [problems, setProblems] = useState([]);
  const navigate=useNavigate();
  const handleLogout = () => {
    // Clear any authentication tokens or user info stored in local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate("/login")
    // Redirect to the login page
    //history.push('/login');
  };
  useEffect(() => { //useEffect is a React Hook that lets you synchronize a component with an external system.
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getproblems');
        //console.log('API Response:', response); // Debugging
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


  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return <div>Please log in</div>;
  }

  if (problems.length === 0) {
    return <div>Loading or No Problems Found...</div>;
  }

  return (
    <div>
      <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1} justifyContent="center" color="Black">
          <Typography variant="h6">Problem List</Typography>
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Log out
        </Button>
      </Toolbar>
    </AppBar> 
      <Container>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableBody>
              {problems.map((problem) => (
                <TableRow key={problem._id}>
                  <TableCell align="center">
                    <Link to={`/solve/${problem._id}`}>{problem.name}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Dashboard;
