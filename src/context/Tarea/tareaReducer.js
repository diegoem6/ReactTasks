import {TAREAS_PROYECTO,
    CREAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    CAMBIAR_ESTADO_TAREA,
    SELECCIONAR_TAREA,
    ACTUALIZAR_TAREA
} from '../../types/index'

export default (state,action)=>{
    switch(action.type){
        case TAREAS_PROYECTO:
            return ({
                ...state,
                tareasProyecto:action.payload
            })
        case CREAR_TAREA:
            
            return ({
                ...state,
                tareasProyecto: [action.payload, ...state.tareasProyecto],
                errorTarea:false
            })
        case VALIDAR_TAREA:
            return ({
                ...state,
                errorTarea:true
            })
        case ELIMINAR_TAREA:
            return({
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea=> tarea._id !== action.payload)
            })
        case ACTUALIZAR_TAREA:
        case CAMBIAR_ESTADO_TAREA:
            return ({
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id===action.payload._id ? action.payload : tarea),
                tareaSeleccionada: null
            })
        case SELECCIONAR_TAREA:
            return ({
                ...state,
                tareaSeleccionada: action.payload
            })
        default: return state;
    }
} 