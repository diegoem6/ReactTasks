import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    MOSTRAR_ERROR_PROYECTO,
    VALIDAR_FORMULARIO,
    SELECCIONAR_PROYECTO,
    ELIMINAR_PROYECTO} from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return ({
                ...state,
                formulario:true,
                error:false
            })
        case OBTENER_PROYECTOS:
            return ({
                ...state,
                proyectos:action.payload
            })
        case AGREGAR_PROYECTOS:
            return ({
                ...state,
                proyectos:[...state.proyectos, action.payload],
                formulario:false,
                error:false
            })
        case VALIDAR_FORMULARIO:
            return ({
                ...state,
                error:true
            })
        case SELECCIONAR_PROYECTO:
            return ({
                ...state,
                proyecto: state.proyectos.filter(
                    proyecto => proyecto._id === action.payload)
            })
        case ELIMINAR_PROYECTO:
            return ({
                ...state,
                proyectos: state.proyectos.filter(
                    proyecto=>proyecto._id !== action.payload
                ),
                proyecto: null
            })
        case MOSTRAR_ERROR_PROYECTO:
            return ({
                ...state,
                mensaje:action.payload
            })
        default:
                return state;
    }
}