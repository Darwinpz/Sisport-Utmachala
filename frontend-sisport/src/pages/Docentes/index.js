import React from 'react'

export default function DocentesPage() {
    return (
        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h4>Administración de Docentes:</h4>
                            <div className="card" style={{backgroundColor:"transparent", border:"none"}}>

                                <button type="button" className="btn btn-primary mb-2">Importar csv</button>
                                <button type="button" className="btn btn-success">Crear Docente</button>

                            </div>


                        </div>

                        <div className="card-body">

                            <div className="table-responsive " style={{marginTop:"auto"}}>
                                <table id="table_products" width="100%" cellSpacing="0" className="table table-hover ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cedula</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Apellido</th>
                                            <th scope="col">Correo</th>
                                            <th scope="col">Opciones</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <th>0705463420</th>
                                            <td>Darwin Josue</td>
                                            <td>Pilaloa Zea</td>
                                            <td>dpilaloa1@utmachala.edu.ec</td>
                                            <td><a type="button" href="/estudiantes/editar/?id=" className="btn btn-primary"><i className="fas fa-eye"></i></a></td>
                        
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </>
    )
}