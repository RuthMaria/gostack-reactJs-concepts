import React, {useState, useEffect} from "react";

import api from "./services/api"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
        url: "https://github.com/Rocketseat/RuthMaria",
        title: "Ruth Maria",
        techs: ["Node", "Express", "TypeScript"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const newRepository = repositories.filter(repository => repository.id !== id)

    setRepositories(newRepository)
  }

  return (
    <div>
      <h1>Repositórios</h1>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
              <li key={repository.id}>
                <span>
                  {repository.title}
                </span>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                </button>
              </li>
          )
        )}   
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
