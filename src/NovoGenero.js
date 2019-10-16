import React, { useState } from 'react'

const NovoGenero = () => {
    const [name, setName] = useState('') 
    const onChange = evt => {
        setName(evt.target.value) //recebendo valor do input pelo onChange
    }
    
    return (
        <div className='container'>
           <h1>Novo Genêro</h1>
           <form>
             <div className='form-group'>
                <label htmlFor='nome'>Nome</label>
                <input type='text' value={name} onChange={onChange} className='form-control' 
                       id='nome' placeholder='Nome do Genêro'/>
             </div> 
             <button type='button' className='btn btn-primary'>Salvar</button>
           </form>
        </div>
    )
}


export default NovoGenero
