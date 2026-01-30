import { useEffect, useState } from 'react'
import './App.css'
import { BiPencil, BiTrash } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

interface matchList {
  id: number,
  game: string
}

function App() {

  const [matchList, setMatchList] = useState<matchList[]>([])
  const [match, setMatch] = useState<string>('')
  const [updatedMatch, setUpdatedMatch] = useState<string>('')
  const [id, setId] = useState<number>(0)

  // Funções de controle de modal
  const openModal = (id: number) => {
    setId(id)

    const modal = document.querySelector(".editDialog")

    modal?.showModal()
  }

  const closeModal = () => {
    const modal = document.querySelector(".editDialog")

    modal?.close()
  }

  // Função que busca a lista de jogos no banco de dados
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/matcheslist").then((rp) => rp.json())

      setMatchList(response)
    } catch (err) {
      console.log("Não foi possível recuperar os dados, por favor, tente novamente mais tarde!")
    }
  }

  useEffect(() => {
    getData()
  }, [matchList])

  // Função que lida com o envio de dados para o back end
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = { match: match }

    try {
      await fetch('http://localhost:3000/matcheslist/post', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      getData()

    } catch (error) {
      console.log("Não foi possível enviar os dados, tente novamente mais tarde", error)
    }

    setMatch('')
  }

  // Função que especifíca para o backend qual é o jogo que deve ser excluído
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/matcheslist/remove/${id}`, {
        method: "DELETE",
      })

      getData()

    } catch (error) {
      console.log("Não foi possível enviar os dados, tente novamente mais tarde", error)
    }

  }

  // Função que especifíca para o backend qual é o jogo que deve ser editada, e o que deve ser modificado
  const handleUpdate = async () =>{
    const data = { match: updatedMatch }

    try {
      await fetch(`http://localhost:3000/matcheslist/update/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      getData()

    } catch (error) {
      console.log("Não foi possível enviar os dados, tente novamente mais tarde", error)
    }
    setUpdatedMatch('')
    closeModal()
  }

  return (
    <>
      <dialog className='editDialog'>
        <div className='divEditIcon'>
          <MdCancel onClick={closeModal} className='iconCancelEdit'/>
        </div>
        <input type="text" name="updatedMatch" value={updatedMatch} className='inputUpdateMatch' required onChange={(e) => setUpdatedMatch(e.target.value)} />
        <button type='button' className='btnAddMatch' onClick={handleUpdate}>Atualizar</button>
      </dialog>

      <div className='main'>
        <div>
          <h1>Lista de jogos do Flamengo que já fui: </h1>

          <div className='divMatchesList'>
            <ul>
              {matchList.length === 0 ? <div><p>Nenhum jogo adicionado.</p></div> : matchList.map((match) => (
                <div className='divLi' key={match.id}>
                  <li>{match.game}</li>
                  <button className='btnEditIcon' onClick={() => openModal(match.id)}>
                    <BiPencil className='pencilIcon' />
                  </button>

                  <button type='button' onClick={() => handleDelete(match.id)} className='btnDeleteIcon'>
                    <BiTrash className='trashIcon' />
                  </button>
                </div>
              ))}
            </ul>
          </div>

          <form className='formAddMatch' onSubmit={(e) => handleSubmit(e)}>
            <h2>Adicionar jogo</h2>
            <input type="text" name="match" value={match} className='inputAddMatch' required onChange={(e) => setMatch(e.target.value)} />
            <button type='submit' className='btnAddMatch'>Enviar</button>
          </form>
        </div>
      </div></>
  )
}

export default App
