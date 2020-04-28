import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/Proyecto/proyectoContext' 
import tareaContext from '../../context/Tarea/tareaContext' 

const FormTarea = () => {


    const tContext = useContext(tareaContext)
    const {tareaSeleccionada, crearTarea, errorTarea, validarTarea,obtenerTareasProyecto, actualizarTarea} = tContext

    const [tarea, settarea] = useState({
        nombre:''
    })

    useEffect( ()=>{
        if (tareaSeleccionada !== null){
            settarea(tareaSeleccionada)
        }else{
            settarea('')
        }

    },[tareaSeleccionada])


    const pContext = useContext(proyectoContext)
    
    const {proyecto} = pContext
    
    if (!proyecto) return null
    
    // array destructuring
    const [proyectoActual] = proyecto

    const {nombre} = tarea

    const onChange = e =>{
        settarea({...tarea,
        [e.target.name]:e.target.value})
    }
    const onSubmit = e =>{
        e.preventDefault()

        //validar que la tarea no sea vacía
        if (nombre.trim()===''){
            validarTarea()
            return;
        }

        if (tareaSeleccionada !== null){
            actualizarTarea(tarea)
        }else{
            tarea.nombre = nombre
            tarea.proyecto = proyectoActual._id
            crearTarea(tarea)
        }
        

        settarea({nombre:''})
        obtenerTareasProyecto(proyectoActual.id)

    }
    return ( 
        <div className="formulario"
            onSubmit={onSubmit}>
            <form>
                <div 
                    className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="nombre"
                        value={nombre}
                        onChange = {onChange}
                    />
                </div>
                <div 
                    className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada === null ? "Agregar tarea":"Guardar tarea"}
                    />
                </div>

            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>

     );
}
 
export default FormTarea;