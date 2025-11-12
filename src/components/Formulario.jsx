import { useState } from "react";


const Formulario = () => {
    const[nombre, setNombre] = useState();
    const handleSubmit= (evento) => {
        evento.preventDefault()
        alert(`Form de: ${nombre} enviado`);
    }
    return(
        <form onSubmit={handleSumit}>
            <input 
                type="text"
                value={nombre}
                onChange={evento => setNombre(evento.target.value)}                
                />
            <button type="submit">Enviar</button>
        </form>
    )
}

export default Formulario;
