from flask import jsonify
import os
from controllers.persona import guardarEstudiantes

def uploadEstudiante(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=2:
            for f in request.files.getlist('file'):
                #f.filename=str(uuid.uuid4())+'.'+str(f.filename).split('.')[1]
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('temp/estudiantes/', f.filename))  
            guardarEstudiantes(os.path.join('temp/estudiantes/', f.filename))
            
            return jsonify({"message":"excel guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 2"}),500


def uploadSyllabus(request, lista_extensions):
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/a) Syllabus/')

            if len(archivos)==1:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 1"}),500
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"syllabus guardado"}),200


def uploadEvaluacion(request, lista_extensions):
    
    try:   
    
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/d) Evaluaciones/')

            if len(archivos)<=7:
                
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))                
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500
            
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"evaluacion guardada"}),200


def uploadInvestigacion(request, lista_extensions):
    
    try: 
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/e) Investigaciones/')
            
            
            if len(archivos)<=7:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500
        
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"investigacion guardada"}),200


def uploadActividad(request, lista_extensions):
    
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/f) Actividades de experimentación/')
            
            if len(archivos)<=7:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500
    
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"actividad guardada"}),200


def uploadProyecto(request, lista_extensions):
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/g) Proyectos/')
            
            if len(archivos)<=2:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 2"}),500
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"proyecto guardado"}),200


def uploadCasoEstudio(request, lista_extensions):
    
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/h) Estudios de caso/')
            
            if len(archivos)<=7:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500

    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"caso de estudio guardado"}),200
     
    
def uploadPlanteamiento(request, lista_extensions):
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/i) Planteamiento de problemas/')

            
            if len(archivos)<=7:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"planteamiento guardado"}),200


def uploadAsistencia(request, lista_extensions):
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/j) Registro de asistencia/')
            
            if len(archivos)==1:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 1"}),500
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"asistencia guardada"}),200
    

def uploadObservacion(request, lista_extensions):
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/k) Registro de observaciones/')
            
            if len(archivos)<=3:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 3"}),500
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"observacion guardada"}),200


def uploadIntraclase(request, lista_extensions):
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/l) Tareas intraclases/')
            

            if len(archivos)<=25:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 25"}),500
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"intraclase guardado"}),200


def uploadAutonomo(request, lista_extensions):
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/m) Tareas autónomas/')
            
            if len(archivos)<=25:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 25"}),500
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"autonomo guardado"}),200


def uploadRefuerzo(request, lista_extensions):
    try:
        if request.method == 'POST':
            archivos=request.files.getlist('file')
            
            seperator=''
            fac_nombre= seperator.join(request.values.getlist('fac_nombre'))
            car_nombre= seperator.join(request.values.getlist('car_nombre'))
            asig_identificador= seperator.join(request.values.getlist('asig_identificador'))
            per_cedula= seperator.join(request.values.getlist('per_cedula'))
            
            ruta=('resources/'+fac_nombre+'/'+car_nombre+'/'+asig_identificador+'/Portafolios/'+per_cedula+'/2. Elementos curriculares/n) Tareas de refuerzo/')
            
            if len(archivos)<=7:
                for f in request.files.getlist('file'):
                    file_ext = os.path.splitext(f.filename)[1]
                    if file_ext not in lista_extensions:
                        return jsonify({"message":"error en el tipo de archivo"}),415
                    f.save(os.path.join(ruta, f.filename))     
            else:
                return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500
    except FileNotFoundError:
        return jsonify({"message":"portafolio no encontrado"}),500
    else:
        return jsonify({"message":"refuerzo guardado"}),200
