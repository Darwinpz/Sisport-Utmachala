from flask import jsonify
import os
import pandas as pd
import csv
import postgresql
import psycopg2
import os

def uploadPersona(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=2:
            for f in request.files.getlist('file'):
                #f.filename=str(uuid.uuid4())+'.'+str(f.filename).split('.')[1]
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/personas', f.filename))  
            guardarPersona(os.path.join('resources/personas/', f.filename))
            return jsonify({"message":"excel guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 2"}),500

def uploadSyllabus(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)==1:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/syllabus/', f.filename))     
            return jsonify({"message":"syllabus guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 1"}),500

def uploadEvaluacion(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=7:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/evaluaciones/', f.filename))     
            return jsonify({"message":"evaluacion guardada"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500

def uploadInvestigacion(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=7:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/investigaciones/', f.filename))     
            return jsonify({"message":"evaluacion guardada"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500

def uploadActividad(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=7:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/actividades/', f.filename))     
            return jsonify({"message":"actividad guardada"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500

def uploadProyecto(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=2:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/proyectos/', f.filename))     
            return jsonify({"message":"proyecto guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 2"}),500

def uploadCasoEstudio(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=7:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/casos_estudio/', f.filename))     
            return jsonify({"message":"caso de estudio guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500

def uploadPlanteamiento(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=7:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/planteamientos/', f.filename))     
            return jsonify({"message":"planteamiento guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500

def uploadAsistencia(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)==1:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/asistencias/', f.filename))     
            return jsonify({"message":"asistencia guardada"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 1"}),500

def uploadObservacion(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=3:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/observaciones/', f.filename))     
            return jsonify({"message":"observacion guardada"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 3"}),500

def uploadIntraclase(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=25:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/intraclases/', f.filename))     
            return jsonify({"message":"intraclase guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 25"}),500

def uploadAutonomo(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=25:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/autonomos/', f.filename))     
            return jsonify({"message":"autonomo guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 25"}),500

def uploadRefuerzo(request, lista_extensions):
    if request.method == 'POST':
        archivos=request.files.getlist('file')
        if len(archivos)<=7:
            for f in request.files.getlist('file'):
                file_ext = os.path.splitext(f.filename)[1]
                if file_ext not in lista_extensions:
                    return jsonify({"message":"error en el tipo de archivo"}),415
                f.save(os.path.join('resources/refuerzos/', f.filename))     
            return jsonify({"message":"refuerzo guardado"}),200
        else:
            return jsonify({"message":"cantidad de archivos sobrepasado. Maximo 7"}),500

def guardarPersona(file):
    filecsv="temp/file.csv"
    csv_file_name = 'temp/personas.csv'
    read_file = pd.read_excel(file)
    read_file.to_csv(filecsv, encoding='utf-8')

    with open(filecsv) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        next(csv_reader)
        next(csv_reader)
        next(csv_reader)
        next(csv_reader)
        with open(csv_file_name, mode='wb') as datos:
            datos = csv.writer(datos, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            # datos.writerow(['cedula','nombre','apellido','tipo','titulo','fecha_nac','edad','email_inst',
            # 'facebook', 'direccion','pais','provincia','ciudad','sexo','estado_civil','telefono_fijo','celular','clave'])
            for row in csv_reader:
                datos.writerow([row[6],row[7],row[8],'ESTUDIANTE','null',row[10],row[11],row[13],'null',row[27],row[15],
                row[16],row[17],row[9],'null',row[21],row[22],row[6]])
    
    with open(csv_file_name, 'r') as f:
	    postgresql.cur.copy_from(f, "persona (per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil, per_telef_fijo, per_telef_celular, per_clave)", sep=';')
    postgresql.conn.commit()

    os.remove(filecsv)
    os.remove(csv_file_name)

    return jsonify({"message":"persona guardada"}),200