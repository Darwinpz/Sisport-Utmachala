
import React from "react";

import { Link } from 'wouter'

export default function VerPortafolio() {

    return (

        <>
            <div className="row">

                <div className="col">

                    <div className="card border-secondary">

                        <div className="card-body">

                            <ul className="file-tree">
                                <li><Link to="#" to="#">I.S.B.A16282</Link>
                                    <ul>
                                        <li><Link to="#" >1. Datos Informativos</Link>
                                            <ul>
                                                <li><Link to="#" data-toggle="modal"
                                                    data-target="#popupconfirmar">Información General</Link></li>
                                                <li><Link to="#" data-toggle="modal"
                                                    data-target="#popupconfirmar">Carta de Compromiso</Link></li>
                                                <li><Link to="#" data-toggle="modal"
                                                    data-target="#popupconfirmar">Datos Personales</Link></li>
                                            </ul>
                                        </li>

                                        <li><Link to="#" >2. Elementos curriculares</Link>
                                            <ul>

                                                <li><Link to="#" >a) Syllabus</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupconfirmar">Syllabus</Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li><Link to="#" >b) Expectativas del curso</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupconfirmar">Expectativas</Link></li>
                                                    </ul>
                                                </li>

                                                <li><Link to="#" >c) Apuntes de clase</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Diario Metacognitivo 1</Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li><Link to="#" >d) Evaluaciones</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Evaluación </Link></li>
                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Evaluaciones" data-cant="3" data-size="2" data-parametro="archivos" data-type=".pdf, .doc, .docx, .xls, .xlsx, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >e) Investigaciones</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Investigacion </Link></li>

                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Investigaciones" data-cant="5" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >f) Actividades de experimentación</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">experimentación</Link></li>

                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Actividades" data-cant="5" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >g) Proyectos</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Proyectos</Link></li>

                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Proyectos" data-cant="3" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >h) Estudios de caso</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Estudio de caso</Link></li>

                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Estudios" data-cant="3" data-size="2" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >i) Planteamiento de problemas</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Problemas</Link></li>
                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Planteamientos" data-cant="3" data-size="2" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >j) Registro de asistencia</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupconfirmar">Asistencia</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >k) Registro de observaciones</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Observacion</Link></li>

                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Observaciones" data-cant="3" data-size="2" data-parametro="archivos" data-type=".pdf, .doc, .docx, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >l) Tareas intraclases</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Intraclases</Link></li>

                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Intraclases" data-cant="5" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >m) Tareas autónomas</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Autonomos</Link></li>

                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Autonomos" data-cant="5" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                                <li><Link to="#" >n) Tareas de Refuerzo</Link>
                                                    <ul>
                                                        <li><Link to="#" data-toggle="modal"
                                                            data-target="#popupdiario">Refuerzos</Link></li>

                                                        <li className="subida"><Link to="#" data-toggle="modal"
                                                            data-target="#subir" data-titulo="Refuerzo" data-cant="3" data-size="3" data-parametro="archivos" data-type=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar">Subir</Link></li>

                                                    </ul>
                                                </li>

                                            </ul>
                                        </li>

                                        <li id="informe_final"><Link to="#" >3. Informe final</Link>
                                            <ul>
                                                <li><Link to="#" data-toggle="modal"
                                                    data-target="#informe">Informe</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </div>

                        <div className="container">

                            <button type="button" className="btn btn-success m-2">DESCARGAR PORTAFOLIO</button>
                            <button type="button" className="btn btn-danger m-2">ELIMINAR PORTAFOLIO</button>
                        </div>

                    </div>

                </div>

            </div>


        </>

    )

}