import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import dotenv from "dotenv";
export default function Login() {

  const [email, setEmail] = useState(""); //useState is a React Hook that lets you add a state variable to your component.
  const [password, setPassword] = useState("");
  const [passwordstatus,setPasswordstatus]=useState("");

  const navigate=useNavigate();
  const handleSubmit = async () => {
    try {
      event.preventDefault();
      const payload = {
        email,
        password
      };
      //const server = process.env.server_url+"login";
      const { data } = await axios.post('http://13.232.66.171:8000/login', payload)
      if (data) {
        console.log(data)
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        console.log("navigating to home");
        navigate("/dashboard");
        
      }
    } catch (error) {
      setPasswordstatus("Incorrect Password. Please Try again!!");
      //console.log(error.response.data)
    }

    //setOutput(data.output);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to AlgoU
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? click to{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              register
            </a>
          </p>
          <p className="mt-10 text-center text-sm text-gray-500">
            {passwordstatus}
          </p>
          
        </div>
      </div>
    </>
  )
}
