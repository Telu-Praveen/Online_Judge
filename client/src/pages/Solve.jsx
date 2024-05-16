import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Solve = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [solution, setSolution] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getproblem/${id}`);
        setProblem(response.data.problem);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSolve = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/solveproblem/${id}`, { solution });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div>
      <h2>{problem.name}</h2>
      <p>{problem.statement}</p>
      <textarea
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
        placeholder="Your solution"
      />
      <button onClick={handleSolve}>Submit Solution</button>
    </div>
  );
};

export default Solve;
