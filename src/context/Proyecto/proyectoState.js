import React, {useReducer} from 'react';
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    MOSTRAR_ERROR_PROYECTO,
    VALIDAR_FORMULARIO,
    SELECCIONAR_PROYECTO,
    ELIMINAR_PROYECTO} from '../../types/index'
import clienteAxios from '../../config/axios'


const ProyectoState = props=>{
    
    
    const initialState={
        proyectos : [],
        formulario:false,
        error: false, 
        proyecto: null,
        mensaje:null
    }

    //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(proyectoReducer, initialState)


    //defino las funciones para el CRUD de formularios
    const mostrarFormulario =()=>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async ()=>{
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg:"hubo un error buscando los proyectos",
                categoria:"alerta-error"
            }
            dispatch({
                type:MOSTRAR_ERROR_PROYECTO,
                payload: alerta
            })
        }
        
    }

    const agregarProyecto = async proyecto =>{

        try {
            const resultado = await clienteAxios.post('/api/proyectos',proyecto);
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg:"hubo un error creando el proyecto",
                categoria:"alerta-error"
            }
            dispatch({
                type:MOSTRAR_ERROR_PROYECTO,
                payload: alerta
            })
        }
        
        
    }

    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const seleccionarProyecto = (idProyecto) =>{
        dispatch({
            type: SELECCIONAR_PROYECTO,
            payload:idProyecto
        })
    }

    const eliminarProyecto = async (idProyecto) =>{
        try {
            await clienteAxios.delete(`/api/proyectos/${idProyecto}`);
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload:idProyecto
            })
        } catch (error) {
            const alerta = {
                msg:"hubo un error eliminando el proyecto",
                categoria:"alerta-error"
            }
            dispatch({
                type:MOSTRAR_ERROR_PROYECTO,
                payload: alerta
            })
        }
        
       
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                error: state.error,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario, 
                obtenerProyectos,
                agregarProyecto,
                mostrarError, 
                seleccionarProyecto,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;