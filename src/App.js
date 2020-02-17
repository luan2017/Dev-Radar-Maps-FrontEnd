import React, { useEffect, useState } from 'react';
import api from '../src/services/api'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

import './styles/global.css';
import './styles/App.css'
import './styles/Sidebar.css'
import './styles/Main.css'


function App() {

  const [devs, setDevs] = useState([])

  useEffect( () => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data)
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]); // adicionando meu noo dev no fim do array
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map( dev => (
            <DevItem key={dev.id} dev={dev}/>
          ))}
        </ul>

      </main>
    </div>
  );
}

export default App;
