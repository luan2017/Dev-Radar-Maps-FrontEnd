import React, {useState, useEffect} from 'react'

function DevForm({ onSubmit }) {

    const [github_username, setGithubUsername] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect( () => {
        // Buscar localização em tempo real
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude)
            setLongitude(longitude)        
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        ); 
      }, []);

     async  function handleSubmit(e) {
          e.preventDefault();  // previnindo o comportamento padrão dentro do html
          await onSubmit({
              github_username,
              techs,
              latitude,
              longitude,
          });

          setTechs('');
          setGithubUsername('');
      }


    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input  
                name="github_username"
                id="github_username" 
                required
                value={github_username}
                onChange={ e => setGithubUsername(e.target.value)}
            />
            </div>

            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input  
                name="techs" 
                id="techs" 
                required
                value={techs}
                onChange={ e => setTechs(e.target.value)}
            />
            </div>

            <div className="input-group">
            <div className="input-block">
                <label>Latitude</label>
                <input 
                type="number"
                name="latitude"
                id="latitude" 
                value={latitude} 
                required
                onChange={ e => setLatitude(e.target.value)} // Serve para guardar o valor do input no estado
                />
            </div>

            <div className="input-block">
                <label>Longitude</label>
                <input 
                type="number"
                name="longitude"
                id="longitude"
                value={longitude}
                required
                onChange={ e => setLongitude(e.target.value)} // Serve para guardar o valor do input no estado
                />
            </div>
            </div>

        <button type="submit">Salvar</button>
      </form>
    );
}

export default DevForm;