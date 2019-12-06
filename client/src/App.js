import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/projects")
      .then(res => {
        setProjects(res.data);
      })
      .catch(error => console.log(error));
  });

  return (
    <div>
      {projects.map(project => {
        return <h2 key={project.id}>{project.name}</h2>;
      })}
    </div>
  );
}

export default App;
