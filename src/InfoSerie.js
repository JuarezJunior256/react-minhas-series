import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({name: ''})
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')


    // recebendo dados das series vinda da api/:id
    const [data, setData] = useState({})
    useEffect(() => {
      
        axios.get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data) // setando na variável de dados
                setForm(res.data) // setando na variável de formulário
            })
    
    }, [match.params.id])

    // recebendo dadaos da api de gênero 
    useEffect(() => {
        axios.get('/api/genres')
            .then(res => {
                setGenres(res.data.data) // setando na várivel de generos
                const genres = res.data.data // criando uma varíavel para receber dados da api para fazer uma busca no array
                const encontrado = genres.find(v => form.genre === v.name) // buscando na varivel de genero 
                if (encontrado) {
                    // se for encontrada a variavel seta na generoId
                    setGenreId(encontrado.id)
                }
            })
    }, [data])

    //custom Header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    // pegando valor da compo genero 
    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        }) //recebendo valor dos inputs do formulario pelo onChange
    }

    // pegando valor do checkbox 
    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    // salvando dados na api 
    const save = () => {

        axios.put('/api/series/' + match.params.id, {
            ...form,
            genre_id: genreId
        })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
      return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    {data.status === 'PARAASSISTIR' && <Badge color='warning'>Para Assistir</Badge>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>Editar Série</h1>
                    <pre>{JSON.stringify(form)}</pre>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar edição</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='nome'>Nome</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control'
                                id='nome' placeholder='Nome da Série' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nome'>Comentários</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control'
                                id='nome' placeholder='Nome da Série' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nome'>Gênero</label>
                            <select className='form-control' onChange={onChangeGenre} value={genreId}>
                                {
                                  genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)
                                }
                            </select>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='assistido'
                                value='ASSISTIDO' checked={form.status === 'ASSISTIDO'} onChange={seleciona('ASSISTIDO')} />
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='paraAssistir'
                                value='PARA_ASSISTIR' checked={form.status === 'PARAASSISTIR'} onChange={seleciona('PARAASSISTIR')} />
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para assistir
                            </label>
                        </div>
                        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                    </form>
                </div>

            }
        </div>
    )
}


export default InfoSerie
