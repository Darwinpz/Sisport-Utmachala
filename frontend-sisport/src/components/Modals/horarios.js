
import useHORARIOS from "hooks/useHorario";
import React, { useState } from "react";

export default function Horarios() {


    const [lunes1,setlunes1] = useState(false);
    const [lunes2,setlunes2] = useState(false);
    const [lunes3,setlunes3] = useState(false);
    const [lunes4,setlunes4] = useState(false);
    const [lunes5,setlunes5] = useState(false);
    const [lunes6,setlunes6] = useState(false);


    const [martes1,setmartes1] = useState(false);
    const [martes2,setmartes2] = useState(false);
    const [martes3,setmartes3] = useState(false);
    const [martes4,setmartes4] = useState(false);
    const [martes5,setmartes5] = useState(false);
    const [martes6,setmartes6] = useState(false);
    

    const [miercoles1,setmiercoles1] = useState(false);
    const [miercoles2,setmiercoles2] = useState(false);
    const [miercoles3,setmiercoles3] = useState(false);
    const [miercoles4,setmiercoles4] = useState(false);
    const [miercoles5,setmiercoles5] = useState(false);
    const [miercoles6,setmiercoles6] = useState(false);
    

    const [jueves1,setjueves1] = useState(false);
    const [jueves2,setjueves2] = useState(false);
    const [jueves3,setjueves3] = useState(false);
    const [jueves4,setjueves4] = useState(false);
    const [jueves5,setjueves5] = useState(false);
    const [jueves6,setjueves6] = useState(false);
    

    const [viernes1,setviernes1] = useState(false);
    const [viernes2,setviernes2] = useState(false);
    const [viernes3,setviernes3] = useState(false);
    const [viernes4,setviernes4] = useState(false);
    const [viernes5,setviernes5] = useState(false);
    const [viernes6,setviernes6] = useState(false);
   
    
    const [error,setError] = useState("");

    const {loading,addHorario,addEstructura} = useHORARIOS()
    
    const handleSubmit = () => {
      
        const arreglo = [
            {num_dia:1,inicio:"07:30",fin:"08:30",estado:lunes1},
            {num_dia:1,inicio:"08:30",fin:"09:30",estado:lunes2},
            {num_dia:1,inicio:"09:30",fin:"10:30",estado:lunes3},
            {num_dia:1,inicio:"10:30",fin:"11:30",estado:lunes4},
            {num_dia:1,inicio:"11:30",fin:"12:30",estado:lunes5},
            {num_dia:1,inicio:"12:30",fin:"13:30",estado:lunes6},
            {num_dia:2,inicio:"07:30",fin:"08:30",estado:martes1},
            {num_dia:2,inicio:"08:30",fin:"09:30",estado:martes2},
            {num_dia:2,inicio:"09:30",fin:"10:30",estado:martes3},
            {num_dia:2,inicio:"10:30",fin:"11:30",estado:martes4},
            {num_dia:2,inicio:"11:30",fin:"12:30",estado:martes5},
            {num_dia:2,inicio:"12:30",fin:"13:30",estado:martes6},
            {num_dia:3,inicio:"07:30",fin:"08:30",estado:miercoles1},
            {num_dia:3,inicio:"08:30",fin:"09:30",estado:miercoles2},
            {num_dia:3,inicio:"09:30",fin:"10:30",estado:miercoles3},
            {num_dia:3,inicio:"10:30",fin:"11:30",estado:miercoles4},
            {num_dia:3,inicio:"11:30",fin:"12:30",estado:miercoles5},
            {num_dia:3,inicio:"12:30",fin:"13:30",estado:miercoles6},
            {num_dia:4,inicio:"07:30",fin:"08:30",estado:jueves1},
            {num_dia:4,inicio:"08:30",fin:"09:30",estado:jueves2},
            {num_dia:4,inicio:"09:30",fin:"10:30",estado:jueves3},
            {num_dia:4,inicio:"10:30",fin:"11:30",estado:jueves4},
            {num_dia:4,inicio:"11:30",fin:"12:30",estado:jueves5},
            {num_dia:4,inicio:"12:30",fin:"13:30",estado:jueves6},            
            {num_dia:5,inicio:"07:30",fin:"08:30",estado:viernes1},
            {num_dia:5,inicio:"08:30",fin:"09:30",estado:viernes2},
            {num_dia:5,inicio:"09:30",fin:"10:30",estado:viernes3},
            {num_dia:5,inicio:"10:30",fin:"11:30",estado:viernes4},
            {num_dia:5,inicio:"11:30",fin:"12:30",estado:viernes5},
            {num_dia:5,inicio:"12:30",fin:"13:30",estado:viernes6}
        ]

        
        var horas = arreglo.filter(dias => dias.estado === true)

        if (horas.length <= 6){

            var asig_codigo = document.getElementById("asig_codigo").innerText
            var peri_codigo = document.getElementById("peri_codigo").innerText
            var clave = document.getElementById("clave").value

            if(clave != ""){    
                
                addHorario({arreglo:horas,asig_codigo,peri_codigo})

                if (!loading){

                    addEstructura({asig_codigo,peri_codigo,clave})

                    window.location.reload()

                }
                
                
            }else{
                setError("Ingresa la clave de la asignatura")
            }
        

        }else{

            setError("Max 6 horas por docente")

        }

    };

    return (

        <div className="modal fade" id="horario" tabIndex="-1" role="dialog" aria-labelledby="horarioModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">HORARIO</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="table-responsive " style={{ marginTop: "auto" }}>
                            <table id="table" width="100%" cellSpacing="0" className="table table-hover ">
                                <thead>
                                    <tr>   
                                        <th scope="col" className="text-center">Hora</th>
                                        <th scope="col" className="text-center">Lunes</th>
                                        <th scope="col"className="text-center">Martes</th>
                                        <th scope="col"className="text-center">Miércoles</th>
                                        <th scope="col"className="text-center">Jueves</th>
                                        <th scope="col"className="text-center">Viernes</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                </tfoot>
                                <tbody>
                                    <tr>
                                        <th className="text-center">7:30 - 8:30</th>
                                        <td className="text-center"><input type="checkbox" name="lunes1" defaultChecked={lunes1} onChange={()=>setlunes1(!lunes1)} /></td>
                                        <td className="text-center"><input type="checkbox" name="martes1" defaultChecked={martes1} onChange={()=>setmartes1(!martes1)}/></td>
                                        <td className="text-center"><input type="checkbox" name="miercoles1" defaultChecked={miercoles1} onChange={()=>setmiercoles1(!miercoles1)}/></td>
                                        <td className="text-center"><input type="checkbox" name="jueves1" defaultChecked={jueves1} onChange={()=>setjueves1(!jueves1)}/></td>
                                        <td className="text-center"><input type="checkbox" name="viernes1" defaultChecked={viernes1} onChange={()=>setviernes1(!viernes1)}/></td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">8:30 - 9:30</th>
                                        <td className="text-center"><input type="checkbox" name="lunes2" defaultChecked={lunes2} onChange={()=>setlunes2(!lunes2)} /></td>
                                        <td className="text-center"><input type="checkbox" name="martes2" defaultChecked={martes2} onChange={()=>setmartes2(!martes2)}/></td>
                                        <td className="text-center"><input type="checkbox" name="miercoles2" defaultChecked={miercoles2} onChange={()=>setmiercoles2(!miercoles2)}/></td>
                                        <td className="text-center"><input type="checkbox" name="jueves2" defaultChecked={jueves2} onChange={()=>setjueves2(!jueves2)}/></td>
                                        <td className="text-center"><input type="checkbox" name="viernes2" defaultChecked={viernes2} onChange={()=>setviernes2(!viernes2)}/></td>

                                    </tr>
                                    <tr>
                                        <th className="text-center">9:30 - 10:30</th>
                                        <td className="text-center"><input type="checkbox" name="lunes3" defaultChecked={lunes3} onChange={()=>setlunes3(!lunes3)} /></td>
                                        <td className="text-center"><input type="checkbox" name="martes3" defaultChecked={martes3} onChange={()=>setmartes3(!martes3)}/></td>
                                        <td className="text-center"><input type="checkbox" name="miercoles3" defaultChecked={miercoles3} onChange={()=>setmiercoles3(!miercoles3)}/></td>
                                        <td className="text-center"><input type="checkbox" name="jueves3" defaultChecked={jueves3} onChange={()=>setjueves3(!jueves3)}/></td>
                                        <td className="text-center"><input type="checkbox" name="viernes3" defaultChecked={viernes3} onChange={()=>setviernes3(!viernes3)}/></td>

                                    </tr>
                                    <tr>
                                        <th className="text-center">10:30 - 11:30</th>
                                        <td className="text-center"><input type="checkbox" name="lunes4" defaultChecked={lunes4} onChange={()=>setlunes4(!lunes4)} /></td>
                                        <td className="text-center"><input type="checkbox" name="martes4" defaultChecked={martes4} onChange={()=>setmartes4(!martes4)}/></td>
                                        <td className="text-center"><input type="checkbox" name="miercoles4" defaultChecked={miercoles4} onChange={()=>setmiercoles4(!miercoles4)}/></td>
                                        <td className="text-center"><input type="checkbox" name="jueves4" defaultChecked={jueves4} onChange={()=>setjueves4(!jueves4)}/></td>
                                        <td className="text-center"><input type="checkbox" name="viernes4" defaultChecked={viernes4} onChange={()=>setviernes4(!viernes4)}/></td>

                                    </tr>
                                    <tr>
                                        <th className="text-center">11:30 - 12:30</th>
                                        <td className="text-center"><input type="checkbox" name="lunes5" defaultChecked={lunes5} onChange={()=>setlunes5(!lunes5)} /></td>
                                        <td className="text-center"><input type="checkbox" name="martes5" defaultChecked={martes5} onChange={()=>setmartes5(!martes5)}/></td>
                                        <td className="text-center"><input type="checkbox" name="miercoles5" defaultChecked={miercoles5} onChange={()=>setmiercoles5(!miercoles5)}/></td>
                                        <td className="text-center"><input type="checkbox" name="jueves5" defaultChecked={jueves5} onChange={()=>setjueves5(!jueves5)}/></td>
                                        <td className="text-center"><input type="checkbox" name="viernes5" defaultChecked={viernes5} onChange={()=>setviernes5(!viernes5)}/></td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">12:30 - 13:30</th>
                                        <td className="text-center"><input type="checkbox" name="lunes6" defaultChecked={lunes6} onChange={()=>setlunes6(!lunes6)} /></td>
                                        <td className="text-center"><input type="checkbox" name="martes6" defaultChecked={martes6} onChange={()=>setmartes6(!martes6)}/></td>
                                        <td className="text-center"><input type="checkbox" name="miercoles6" defaultChecked={miercoles6} onChange={()=>setmiercoles6(!miercoles6)}/></td>
                                        <td className="text-center"><input type="checkbox" name="jueves6" defaultChecked={jueves6} onChange={()=>setjueves6(!jueves6)}/></td>
                                        <td className="text-center"><input type="checkbox" name="viernes6" defaultChecked={viernes6} onChange={()=>setviernes6(!viernes6)}/></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>


                    </div>
                    <div className="modal-footer">
                        {error && <strong>{error}</strong>}
                        <button type="button" onClick={()=>handleSubmit()}  className="btn btn-success">Guardar Horario</button>
                    </div>
                </div>
            </div>

        </div>

    )

}