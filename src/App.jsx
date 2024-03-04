import './App.css'
import { useState, useEffect } from "react"

function App() {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevatarea] = useState('')
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      agregarNuevaTarea();
    }
  };

  const agregarNuevaTarea = () => {
    if (!nuevaTarea) return;
    if (nuevaTarea.length > 80) return;
    setTareas([...tareas, { id: tareas.length + 1, nombre: nuevaTarea }])
    setNuevatarea('')
  }
  const borrarTarea = (id) => {
    setTareas(tareas.filter(ele => ele.id !== id))
  }
  const handleCambiarTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light")
  }
  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme])

  return (
    <>
      <div className='bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col font-mono '>
        <header className='p-4'>
          <button className='size-15' onClick={handleCambiarTheme}>
            {theme === 'light' ? <img className='size-10' src="https://www.svgrepo.com/show/445254/moon-solid.svg" alt="" /> :
              <img className='size-10' src="https://www.svgrepo.com/show/484356/sun.svg" alt="" />
            }
          </button>
        </header>
        <div className='h-screen w-full items-center content-center mx-auto' >
          <h1 className='text-xl font-bold'>LISTA DE TAREAS</h1>
          <div className="list">
            {tareas.length < 1 ?
              <div className='bg-white h-10 text-black dark:bg-gray-900 dark:text-white text-xl m-4'><h1>Ingrese su primer tarea..</h1></div>
              :
              <ul className=''>
                {tareas.map(ele => (
                  <div className='flex flex-row p-2' key={ele.id}>
                    <li className='w-full text-wrap text-lg text-left border-b-2 border-neutral-500 border-opacity-100 py-2'>{ele.nombre}</li>
                    <button className='border-md bg-red-500 hover:bg-red-400 rounded-xl size-6 text-white' onClick={() => borrarTarea(ele.id)}>X</button>
                  </div>
                ))}
              </ul>
            }
          </div>
          <div className="flex flex-row justify-center items-center">
            <input autoFocus maxLength="80"
              className='input-tarea w-3/4 h-10 m-2 p-2 outline-none text-black border border-b-4 border-b-gray-600 hover:border-gray-900 dark:border-b-gray-400  dark:hover:border-b-black'
              placeholder='Tarea' type="text" value={nuevaTarea} onChange={(e) => setNuevatarea(e.target.value)} onKeyDown={handleKeyDown} />
            <button
              className='h-10 w-20 border-md font-bold bg-black text-sm text-white dark:bg-white dark:text-black '
              type='submit' onClick={agregarNuevaTarea}>Agregar</button>

          </div>
          {nuevaTarea.length > 60 ? <label className='text-red-500 text-left p-2' htmlFor="input-tarea">Máximo 80 carácteres | Actual {nuevaTarea.length}</label> : null}
        </div>

      </div>
    </>
  )
}

export default App
