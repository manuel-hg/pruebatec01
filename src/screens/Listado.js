import { useState } from "react"
import { useSelector } from "react-redux"
import { selectToken } from "../slices/appSlice"
import { useLocation } from 'react-router-dom';


export default () => {
    const token = useSelector(selectToken)
    const [initialState, setInitialState] = useState({
        value: "",
        data: []
    })

    const { value, data } = initialState

    const handleSetValue = ({ target: { value } }) => {
        setInitialState({
            ...initialState,
            value: value,
          })
    }

    const handleFilter = async () =>{
        try {
            const request = await fetch(
              "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization": token
                },
                body: JSON.stringify({
                  "Body": {
                    "SearchText": value 
                  }
                })
              })
            const response = await request.json()
            if(response.IsOK){
                setInitialState({...initialState, data: response.Body})
            }
      
          } catch (error) {
            console.log("error" + error)
          }
    }

    return (
        <div className="h-screen w-screen">
            <div className="flex items-center border-b border-teal-500 py-2 mb-10">
                <input className="appearance-none bg-transparent border-none w-[70%] text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Buscar.." aria-label="Busqueda" value={value} onChange={handleSetValue}/>
                <button onClick={handleFilter} className="bg-gray-600 text-white px-2 py-1 rounded-sm">Buscar</button>
                <button  data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Agregar
                </button>
            </div>
            <div>
                {
                    data?.map( x => 
                            <div>
                                <p>{x.Name}</p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}