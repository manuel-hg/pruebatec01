import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setToken } from "../slices/appSlice";

export default () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [initialState, setInitialState] = useState({ //usestate
    user: "",
    password: "",
    error: "",
    logged: false,
    saved: false,
    usuario_name: ""
  })

  const { user, password, saved, error,logged, usuario_name } = initialState //desestructuracion

  useEffect(() => {
    if (saved) peticion()
  }, [saved])

  const peticion = async () => {
    try {
      const request = await fetch(
        "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "Body": {
              "Username": user,
              "Password": password
            }
          })
        })
      const response = await request.json()
      
      if (response.IsOK) {
        setInitialState({ ...initialState, logged:true, error:"", usuario_name:response.Body.UserLoginData.Name + " " + response.Body.UserLoginData.FatherLastName})
        /*
        navigate("/usuarios", {
            state: {
                token: response.Token
            }
        })*/
        dispatch(setToken(response.Body.Token))
        navigate("/usuarios")
      } else {
        setInitialState({ ...initialState, error: response.Messages })
      }

    } catch (error) {
      console.log("error" + error)
    }
  }

  const handleUsuarioChange = ({ target: { value } }) => {
    setInitialState({
      ...initialState,
      user: value,
      saved: false
    })
  }

  const handlePasswordChange = ({ target: { value } }) => {
    setInitialState({
      ...initialState,
      password: value,
      saved: false
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInitialState({ ...initialState, saved: true })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Ingresa tu usuario" value={user} onChange={handleUsuarioChange} />
            {
              saved && !user
              &&
              <p className="text-red-500 text-xs">El usuario es requerido</p>
            }

          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Ingresa tu contraseña" value={password} onChange={handlePasswordChange} />
            {
              saved && !password
              &&
              <p className="text-red-500 text-xs">La contraseña es requerida</p>
            }
          </div>
          {
            saved && user && password && 
            (error ? 
              <div className="mb-4">
                <div role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 text-xs">
                    Ha ocurrido un error
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-xs text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
              : logged &&
              <div className="mb-4">
                <div role="alert">
                  <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2 text-xs">
                    Bienvenid@
                  </div>
                  <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-xs text-green-700">
                    <p>{usuario_name}</p>
                  </div>
                </div>
              </div>
            )
          }
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
              Iniciar Sesion
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}