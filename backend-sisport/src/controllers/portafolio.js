
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
                                    "resumen": "", "preg1": "","preg2":"","preg3":"","preg4":"", "anexos": ""
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

                const { asig_codigo, peri_codigo, per_codigo } = req.body

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

                const portafolio = busqueda.portafolios.filter(portafolio => portafolio.datos_informativos.cod_estudiante == per_codigo)

                res.status(200).json({ "message": [{ estructura: busqueda.generales, nombre_esquema:nombre_esquema, portafolio_data: portafolio[0] }] });

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


        jwt.verify(req.token, process.env.jwtcode, async (err,data) => {

            if (err) {

                res.status(403).json({ "message": 'Token no válido' });

            } else {

                const { asig_codigo, peri_codigo, num_diario, tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4 } = req.body

                const per_codigo = data.usuario.per_codigo

                const carrera_facultad = await pool.query("SELECT * FROM vi_asignatura_carrera where asig_codigo=$1", [asig_codigo]);

                const nombre_esquema = carrera_facultad.rows[0].fac_abreviatura + "." + carrera_facultad.rows[0].car_abreviatura + "." + "esqs"

                const esquema = EstructuraSchema.add(nombre_esquema)

                const busqueda = await esquema.findOne({ 'generales.cod_asignatura': asig_codigo, 'generales.periodo': peri_codigo });

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

            expectativas: {},
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

        informe_final: {}

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