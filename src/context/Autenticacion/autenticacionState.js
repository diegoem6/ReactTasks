import React, {useReducer} from 'react';
import autenticacionContext from './autenticacionContext'
import autenticacionReducer from './autenticacionReducer'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'


import {
    REGISTRO_EXITOSO,
REGISTRO_ERROR,
OBTENER_USUARIO, 
LOGIN_EXITOSO,
LOGIN_ERROR,
CERRAR_SESION} from '../../types/index'

const AutenticacionState = (props) => {
    const initialState ={
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje:null,
        cargando:true
    }
    const [state,dispatch] = useReducer(autenticacionReducer,initialState)

    const registrarUsuario = async (usuario) =>{
        try {
            const respuesta = await clienteAxios.post('api/usuarios', usuario)
            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data
            })

            usuarioAutenticado()
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type:REGISTRO_ERROR,
                payload:alerta
            })
            
        }
        
        
    }

    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if (token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth')
            dispatch({
                type:OBTENER_USUARIO,
                payload:respuesta.data.usuario
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
            
        }
    }

    const cerrarSesion = () =>{
        dispatch({
            type:CERRAR_SESION
        })
    }

    const loguearUsuario = async (usuario)=>{
        try {
            
            const respuesta = await clienteAxios.post('/api/auth', usuario)
            dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data
            })

            usuarioAutenticado()
            
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type:LOGIN_ERROR,
                payload:alerta
            })
            
        }
    }

    return (
        <autenticacionContext.Provider 
        value={{
            token:state.token,
            autenticado:state.autenticado,
            usuario:state.usuario,
            mensaje:state.mensaje,
            cargando:state.mensaje,
            registrarUsuario,
            loguearUsuario,
            usuarioAutenticado,
            cerrarSesion
        }}>
            {props.children}
        </autenticacionContext.Provider>
    )

}
export default AutenticacionState;

