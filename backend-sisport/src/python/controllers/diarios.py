import errno
import os
from flask import jsonify
from controllers.generardiario import crear_diario


def generar_diario(request):

    #lugar = arbol_json["elementos_curriculares"]["diarios"]

	try:
        
		json_req = request.json
		fac_abreviatura = json_req['fac_abreviatura']
		car_abreviatura = json_req['car_abreviatura']
		asig_abreviatura = json_req['asig_abreviatura']
		per_cedula = json_req['per_cedula']

		docente = "WILMER RIVAS"

		ruta_carpeta = ('resources/'+fac_abreviatura+'/'+car_abreviatura+'/'+asig_abreviatura +
						'Portafolios/'+per_cedula+'/2. Elementos curriculares/c) Apuntes de clase/')

		if not os.path.isdir(ruta_carpeta):
			os.makedirs(ruta_carpeta)

		lista_estrategias = []
		lista_contenidos = []
		lista_actividades = []

		cod_diario = diario.__str__()

		num_diario = "1"
		periodo = "2020-2021"
		tiempo = "2 horas"
		fecha = "27/04/2021"
		tema = "este es un tema"
		resumen = "este es un resumen"

		estrategias = ["estrategia 1\nestrategia2\nestrategia3"]
		
		for i in range(len(estrategias.split("\n"))):

			lista_estrategias.append(estrategias.split("\n")[i].replace("\r", ""))

			contenidos = ["contenido1\ncontenido2\contenido3"]

		for i in range(len(contenidos.split("\n"))):

			lista_contenidos.append(contenidos.split("\n")[i].replace("\r", ""))

			actividades = ["actividad1\nactividad2\nactividad3"]

		for i in range(len(actividades.split("\n"))):

			lista_actividades.append(actividades.split("\n")[i].replace("\r", ""))

		objetivo = "este es un objetivo"
		reflexion1 = "porque si"
		reflexion2 = "porque si"
		reflexion3 = "porque si"
		reflexion4 = "porque si"

		crear_diario(ruta_carpeta+'DIARIO METACOGNITIVO '+cod_diario+'.docx', num_diario.__str__(), periodo, tiempo, fecha, docente, tema, lista_contenidos, objetivo,lista_actividades,lista_estrategias,resumen,reflexion1,reflexion2,reflexion3,reflexion4)
		
	except OSError:
			
		return jsonify({"message":"error al generar diario"}),500
		
	else:
			
		return jsonify({"message":"diario generado"}),200


    # for diario in lugar:

    # archivo_zip = shutil.make_archive("media/"+cod_port+"/diarios","zip",base_dir=ruta_carpeta)
