import React, {useReducer} from 'react';

import tareaReducer from './tareaReducer'
import TareaContext from './tareaContext';

import {TAREAS_PROYECTO,
    CREAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    CAMBIAR_ESTADO_TAREA,
    SELECCIONAR_TAREA,
    ACTUALIZAR_TAREA
} from '../../types/index'

import clienteAxios from '../../config/axios'

const TareaState = props => {

    const initialState={
        tareasProyecto : [],
        errorTarea:false,
        tareaSeleccionada:null
    }
     //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(tareaReducer, initialState)

    const obtenerTareasProyecto = async (proyecto) =>{
        
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params:{proyecto}})
            
            dispatch({
                type:TAREAS_PROYECTO,
                payload:resultado.data.tareas
            })
        } catch (error) {
           console.log(error) 
        }
        
    }

    const crearTarea = async tarea =>{
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            console.log(resultado)
            dispatch({
                type:CREAR_TAREA,
                payload:resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const validarTarea = () =>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (tarea)=>{
        try {
            const proyecto =  tarea.proyecto
            await clienteAxios.delete(`api/tareas/${tarea._id}`,  {params:{proyecto}})
            dispatch  ({
                type:ELIMINAR_TAREA,
                payload:tarea._id
            })  
            obtenerTareasProyecto(proyecto)
        } catch (error) {
            console.log(error);
        }
    }

    const cambiarEstadoTarea = async (tarea) =>{
        try {
            const resultado = await clienteAxios.put(`api/tareas/${tarea._id}`,  tarea)
            console.log(resultado);
            dispatch ({
                type:CAMBIAR_ESTADO_TAREA,
                payload:tarea
            })
        } catch (error) {
            console.log(error)
        }

        
    }

    const seleccionarTarea = (tarea) =>{
        dispatch ({
            type:SELECCIONAR_TAREA,
            payload:tarea
        })
    }

    const actualizarTarea = async (tarea) =>{
        try {
            await clienteAxios.put(`api/tareas/${tarea._id}`,  tarea)
            dispatch ({
                type:ACTUALIZAR_TAREA,
                payload:tarea
            })
        } catch (error) {
            console.log(error)
        }
    }
     return (
         <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareasProyecto,
                crearTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea, 
                seleccionarTarea,
                actualizarTarea
            }}
         >
             {props.children}
         </TareaContext.Provider>
     )


}

export default TareaState