
//const PortafolioSchema = require('../models/portafolio')

const EstructuraSchema = require('../models/estructura')
const jwt = require("jsonwebtoken")
const PortafolioCtrl = {};
const pool = require("../database/postgresql")

PortafolioCtrl.add = async (req, res, next) => {

    var err = new Error();

    try {

        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, clave } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda != null && busqueda.generales.clave == clave) {

                    const diarios = []

                    const horario = await pool.query("SELECT * FROM horario WHERE asig_codigo=$1 and peri_codigo=$2 order by hor_num_dia", [asig_codigo, peri_codigo]);

                    if (horario.rowCount > 0) {

                        const periodo = await pool.query("SELECT *FROM periodo WHERE peri_codigo = $1", [peri_codigo]);

                        const periodos = periodo.rows[0];

                        var semanas = total_semanas(periodos.peri_fecha_inicial, periodos.peri_fecha_final);

                        var num_diario = 1;

                        var fecha_inicio = new Date(periodos.peri_fecha_inicial);

                        for (let i = 0; i < semanas; i++) {

                            horario.rows.forEach(dia => {

                                var fecha_diario = new Date(fecha_inicio);

                                fecha_diario.setDate(fecha_diario.getDate() + (dia.hor_num_dia - 1));

                                const periodo_inicio = periodos.peri_fecha_inicial
                                const periodo_final = periodos.peri_fecha_final

                                json_diario = {
                                    "num_diario": num_diario, "tiempo": dia.hor_cant_horas + " HORAS",
                                    "fecha": dia.hor_dia + ", " + fecha_diario.getDate() + " DE " + obtener_mes(fecha_diario.getMonth()) + " DEL " + fecha_diario.getFullYear(),
                                    "unidad": "", "periodo_inicio": periodo_inicio, "periodo_fin": periodo_final,
                                    "tema": "", "contenidos": "", "objetivos": "", "actividades": "", "estrategias": "",
                                    "resumen": "", "preg1": "", "preg2": "", "preg3": "", "preg4": "", "anexos": ""
                                }

                                num_diario++;

                                diarios.push(json_diario)


                            })

                            fecha_inicio.setDate(fecha_inicio.getDate() + 7);

                        }
                    }

                    busqueda.portafolios.push(portafolio(per_codigo, diarios))

                    await busqueda.save()

                    await pool.query("INSERT INTO public.persona_asignatura (per_codigo, asig_codigo, peri_codigo) values($1,$2,$3)", [per_codigo, asig_codigo, peri_codigo]);

                    res.status(200).json({ "message": "Portafolio Creado" });

                } else {

                    res.status(400).json({ "message": 'Clave incorrecta' });

                }


            }
        })


    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


PortafolioCtrl.find = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const { asig_codigo, peri_codigo,sem_codigo, per_codigo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {


                    const portafolio = busqueda.portafolios.filter(portafolio => portafolio.datos_informativos.cod_estudiante == per_codigo)

                    const estudiante = await pool.query("SELECT per_cedula, per_nombre,per_apellido FROM persona where per_codigo=$1", [per_codigo]);

                    //const periodo_semestre = await pool.query("SELECT peri.peri_nombre,sem.sem_nombre FROM periodo as peri,semestre as sem where peri.sem_codigo = sem.sem_codigo and peri.peri_codigo =$1", [peri_codigo]);

                    const periodo_semestre = await pool.query("SELECT peri.peri_nombre,sem.sem_nombre"
                    +" FROM periodo as peri,periodo_semestre as peri_sem, semestre as sem" 
                    +" where peri.peri_codigo = peri_sem.peri_codigo and peri_sem.sem_codigo = sem.sem_codigo and peri_sem.peri_codigo =$1 and peri_sem.sem_codigo=$2", [peri_codigo,sem_codigo]);
                    
                    res.status(200).json({ "message": [{ estructura: busqueda.generales, nombre_esquema: nombre_esquema, portafolio_data: portafolio[0], estudiante: estudiante.rows[0], extras:periodo_semestre.rows[0] }] });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });
                    
                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


PortafolioCtrl.remove = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const { asig_codigo, peri_codigo, per_codigo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {


                    const portafolio = busqueda.portafolios.filter(portafolio => portafolio.datos_informativos.cod_estudiante != per_codigo)

                    busqueda.portafolios = []

                    busqueda.portafolios = portafolio

                    await busqueda.save()

                    await pool.query("DELETE FROM public.persona_asignatura  where per_codigo=$1 and asig_codigo=$2 and peri_codigo=$3", [per_codigo, asig_codigo, peri_codigo]);

                    res.status(200).json({ "message": "Portafolio Eliminado" });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}


PortafolioCtrl.getDiario = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, num_diario, est_codigo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {

                    var portafolio = []

                    if (est_codigo) {

                        portafolio = busqueda.portafolios.find(portafolio => portafolio.datos_informativos.cod_estudiante == est_codigo)

                    } else {

                        portafolio = busqueda.portafolios.find(portafolio => portafolio.datos_informativos.cod_estudiante == per_codigo)

                    }

                    const diario = portafolio.elementos_curriculares.apuntes[num_diario - 1]

                    res.status(200).json({ "message": diario });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}


PortafolioCtrl.getinforme = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, est_codigo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {

                    var portafolio = []

                    if (est_codigo) {

                        portafolio = busqueda.portafolios.find(portafolio => portafolio.datos_informativos.cod_estudiante == est_codigo)

                    } else {
                        portafolio = busqueda.portafolios.find(portafolio => portafolio.datos_informativos.cod_estudiante == per_codigo)

                    }

                    const informe = portafolio.informe_final

                    res.status(200).json({ "message": informe });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}



PortafolioCtrl.updateInforme = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, contenido } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {

                    var temp = []

                    for (var portafolio of busqueda.portafolios) {

                        if (portafolio.datos_informativos.cod_estudiante == per_codigo) {

                            portafolio.informe_final = { contenido: contenido }

                            break;
                        }

                    }

                    temp = busqueda.portafolios

                    busqueda.portafolios = []

                    busqueda.portafolios = temp

                    await busqueda.save()

                    res.status(200).json({ "message": "Informe Editado" });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}



PortafolioCtrl.getExpectativas = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, est_codigo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {

                    var portafolio = [];

                    if (est_codigo) {

                        portafolio = busqueda.portafolios.find(portafolio => portafolio.datos_informativos.cod_estudiante == est_codigo)

                    } else {
                        portafolio = busqueda.portafolios.find(portafolio => portafolio.datos_informativos.cod_estudiante == per_codigo)

                    }

                    const expectativas = portafolio.elementos_curriculares.expectativas

                    res.status(200).json({ "message": expectativas });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}



PortafolioCtrl.updateExpectativas = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, contenido } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {

                    var temp = []

                    for (var portafolio of busqueda.portafolios) {

                        if (portafolio.datos_informativos.cod_estudiante == per_codigo) {

                            portafolio.elementos_curriculares.expectativas = { contenido: contenido }

                            break;
                        }

                    }

                    temp = busqueda.portafolios

                    busqueda.portafolios = []

                    busqueda.portafolios = temp

                    await busqueda.save()

                    res.status(200).json({ "message": "Expectativas Editado" });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}



PortafolioCtrl.uploadfiles = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, tipo, nombre_archivo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {

                    var temp = []

                    for (var portafolio of busqueda.portafolios) {

                        if (portafolio.datos_informativos.cod_estudiante == per_codigo) {


                            if(tipo == "informativos"){

                                portafolio.datos_informativos["informativos"] = nombre_archivo

                            }else if (tipo == "asistencia" || tipo == "syllabus") {

                                portafolio.elementos_curriculares[tipo].nombre_archivo = nombre_archivo

                            } else {

                                portafolio.elementos_curriculares[tipo].push({ nombre_archivo: nombre_archivo })

                            }

                            break;
                        }

                    }

                    temp = busqueda.portafolios

                    busqueda.portafolios = []

                    busqueda.portafolios = temp

                    await busqueda.save()

                    res.status(200).json({ "message": "Archivo Subido" });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}



PortafolioCtrl.removefiles = async (req, res, next) => {

    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const per_codigo = data.usuario.per_codigo

                const { asig_codigo, peri_codigo, tipo, nombre_archivo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {

                    
                    const portafolio = busqueda.portafolios.find(portafolio => portafolio.datos_informativos.cod_estudiante == per_codigo)
                    
                    if(tipo == "informativos"){

                        portafolio.datos_informativos["informativos"] = ""

                    }else if (tipo == "asistencia" || tipo =="syllabus"){

                        portafolio.elementos_curriculares[tipo].nombre_archivo = ""

                    }else{

                        portafolio.elementos_curriculares[tipo] = portafolio.elementos_curriculares[tipo].filter(portafolio => portafolio.nombre_archivo != nombre_archivo)

                    }

                    busqueda.portafolios = []

                    busqueda.portafolios = portafolio

                    await busqueda.save()
                    

                    res.status(200).json({ "message": "Archivo Eliminado" });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }


            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }

}

PortafolioCtrl.updateDiario = async (req, res, next) => {


    var err = new Error();

    try {


        jwt.verify(req.token, process.env.jwtcode, async (err, data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const { asig_codigo, peri_codigo, num_diario, tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 } = req.body

                const per_codigo = data.usuario.per_codigo

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                if (busqueda) {
                    var temp = []

                    for (var portafolio of busqueda.portafolios) {

                        if (portafolio.datos_informativos.cod_estudiante == per_codigo) {

                            portafolio.elementos_curriculares.apuntes[num_diario - 1].tema = tema
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].contenidos = contenidos
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].objetivos = objetivos
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].actividades = actividades
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].estrategias = estrategias
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].resumen = resumen
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].preg1 = preg1
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].preg2 = preg2
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].preg3 = preg3
                            portafolio.elementos_curriculares.apuntes[num_diario - 1].preg4 = preg4

                            break;
                        }

                    }

                    temp = busqueda.portafolios

                    busqueda.portafolios = []

                    busqueda.portafolios = temp

                    await busqueda.save()

                    res.status(200).json({ "message": "Diario Editado" });

                } else {

                    res.status(400).json({ "message": "No existe el portafolio" });

                }
            }
        })

    } catch (e) {

        err.message = e.message;
        err.status = 500;
        next(err);

    }


}



function portafolio(per_codigo, diarios) {

    const obj = {

        datos_informativos: {

            cod_estudiante: per_codigo
        },

        elementos_curriculares: {

            expectativas: { contenido: "" },
            syllabus:{},
            apuntes: diarios,
            evaluaciones: [],
            investigaciones: [],
            actividades: [],
            proyectos: [],
            casos_estudio: [],
            planteamientos: [],
            asistencia: {},
            observaciones: [],
            intraclases: [],
            autonomos: [],
            refuerzo: []

        },

        informe_final: { contenido: "" }

    }


    return obj

}

function obtener_mes(num_mes) {

    var meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    return meses[num_mes];

}



function total_semanas(fecha_inicio, fecha_fin) {

    var inicio = new Date(fecha_inicio);
    var fin = new Date(fecha_fin);
    var cant_dias = fin.getTime() - inicio.getTime();

    return Math.round(cant_dias / (1000 * 60 * 60 * 24 * 7)) - 1;
}


module.exports = PortafolioCtrl;