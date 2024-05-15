import * as React from 'react';
import axios from 'axios';


const people = [];
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/getproblems");
    //console.log(response.data.problems);
    for(var i=0;i<response.data.problems.length;i++){
      people.push(response.data.problems[i])
    }
    console.log(people)

  } catch (error) {
    // Handle error
    console.error(error);
  }
};


export default function Example() {
  return (
    <div>
      <button onClick={fetchData}>button</button>
    <ul role="list" className="divide-y divide-gray-100">
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
          <p className="text-sm font-semibold leading-6 text-gray-900">{people.name}</p>
          </div>
        </li>
    </ul>
    </div>
  )
}