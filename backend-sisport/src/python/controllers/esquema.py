import errno
import os
from flask import jsonify

def crearFacultad(request):
    
    try:
        
        json_req = request.json
        fac_nombre = json_req['fac_nombre']
        
        os.mkdir('resources/'+fac_nombre)
         
    except OSError:
        
        return jsonify({"message":"error al crear facultad"}),500
    
    else:
        
        return jsonify({"message":"facultad creada"}),200
    

def crearCarrera(request):
    
    try:
        
        json_req = request.json
        fac_nombre = json_req['fac_nombre']
        car_nombre= json_req['car_nombre']
        
        os.mkdir('resources/'+fac_nombre+'/'+car_nombre)
        
    except OSError:
        
        return jsonify({"message":"error al crear carrera"}),500
    
    else:
        
        return jsonify({"message":"carrera creada"}),200


def crearAsignatura(request):
    
    try:
        
        json_req = request.json
        fac_nombre = json_req['fac_nombre']
        car_nombre= json_req['car_nombre']
        asig_identificador=json_req['asig_identificador']
        
        path=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador)
        
        os.mkdir(path)
        os.mkdir(path+'/Portafolios')
        
    except OSError:
        
        return jsonify({"message":"error al crear asignatura"}),500

    else:
        
        return jsonify({"message":"asignatura creada"}),200
    

def crearPortafolio(request):
    
    try:
        
        json_req = request.json
        fac_nombre = json_req['fac_nombre']
        car_nombre= json_req['car_nombre']
        asig_identificador=json_req['asig_identificador']
        per_cedula=json_req['per_cedula']
        
        pathCedula=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula)
        os.mkdir(pathCedula)
        
        pathDatosInf=(pathCedula+'/1. Datos informativos')
        os.mkdir(pathDatosInf)
        
        pathElmentosCurri=(pathCedula+'/2. Elementos curriculares')
        os.mkdir(pathElmentosCurri)
        os.mkdir(pathElmentosCurri+'/a) Syllabus')
        os.mkdir(pathElmentosCurri+'/b) Expectativas')
        os.mkdir(pathElmentosCurri+'/c) Apuntes de clase')
        os.mkdir(pathElmentosCurri+'/d) Evaluaciones')
        os.mkdir(pathElmentosCurri+'/e) Investigaciones')
        os.mkdir(pathElmentosCurri+'/f) Actividades de experimentación')
        os.mkdir(pathElmentosCurri+'/g) Proyectos')
        os.mkdir(pathElmentosCurri+'/h) Estudios de caso')
        os.mkdir(pathElmentosCurri+'/i) Planteamiento de problemas')
        os.mkdir(pathElmentosCurri+'/j) Registro de asistencia')
        os.mkdir(pathElmentosCurri+'/k) Registro de observaciones')
        os.mkdir(pathElmentosCurri+'/l) Tareas intraclases')
        os.mkdir(pathElmentosCurri+'/m) Tareas autónomas')
        os.mkdir(pathElmentosCurri+'/n) Tareas de refuerzo')
        
        pathInformeFin=(pathCedula+'/3. Informe final')
        os.mkdir(pathInformeFin)
    
    except OSError as error:
        print(error)
        return jsonify({"message":"error al crear portafolio"}),500
    else:
        return jsonify({"message":"portafolio creado"}),200  