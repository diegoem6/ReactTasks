import React,{Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/Proyecto/proyectoContext' 

const NuevoProyecto = () => {
    
    const pContext = useContext(proyectoContext)
    
    const {formulario, mostrarFormulario, error, agregarProyecto, mostrarError} = pContext

    const [proyecto, setproyecto] = useState({
        nombre:''
    })
    const {nombre} = proyecto


    const onChangeProyecto = (e)=>{
        setproyecto({
            ...proyecto, 
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = (e)=>{
        e.preventDefault();

        //hacer validaciones y reseteo de form
        if (nombre.trim() === ''){
            mostrarError()
            return;
        }

        // llamo a agregar proyecto
        agregarProyecto(proyecto)
        setproyecto("")
        
    }

    const onClikcNuevoProyecto = (e)=>{
        mostrarFormulario();
    }
    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick = {onClikcNuevoProyecto}
            >Nuevo proyecto</button>

            {formulario ?
                (
                    <form   
                        className="formulario-nuevo-proyecto"
                        onSubmit = {onSubmitProyecto}
                        >
                        <input  
                            type="text"
                            className="input-text"
                            placeholder="Nombre proyecto"
                            name="nombre"
                            value ={nombre}
                            onChange = {onChangeProyecto}
                        />
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value = "Agregar proyecto"
                        />    
                    </form>
                ):
                (null)
                }
                {error? <p className="mensaje error">El nombre del formulario no puede estar vacío</p> : null}
        </Fragment>
     );
}
 
export default NuevoProyecto;