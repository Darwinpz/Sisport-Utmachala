import database.postgresql as postgresql
import os
import pandas as pd
import csv
from flask import jsonify


def guardarEstudiantes(file):
    filecsv="temp/file.csv"
    csv_file_name = 'temp/estudiantes.csv'
    
    read_file = pd.read_excel(file)
    read_file.to_csv(filecsv, encoding='utf-8')

    with open(filecsv, encoding='utf8', newline='') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        next(csv_reader)
        next(csv_reader)
        next(csv_reader)
        next(csv_reader)
        with open(csv_file_name, mode='w', newline='') as datos:
            datos = csv.writer(datos, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            # datos.writerow(['cedula','nombre','apellido','tipo','titulo','fecha_nac','edad','email_inst',
            # 'facebook', 'direccion','pais','provincia','ciudad','sexo','estado_civil','telefono_fijo','celular','clave'])
            for row in csv_reader:
                datos.writerow([row[6],row[7],row[8],'ESTUDIANTE','null',row[10],row[11],row[13],'null',row[27],row[15],row[16],row[17],row[9],'null',row[21],row[22],row[6]])
    
    with open(csv_file_name, 'r') as f:
	    postgresql.cur.copy_from(f, "persona (per_cedula, per_nombre, per_apellido, per_tipo, per_titulo, per_fecha_nacimiento, per_edad, per_correo, per_facebook, per_direccion, per_pais, per_provincia, per_ciudad, per_sexo, per_estado_civil, per_telef_fijo, per_telef_celular, per_clave)", sep=';')
    postgresql.conn.commit()

    os.remove(filecsv)
    os.remove(csv_file_name)
    os.remove(file)

    return jsonify({"message":"estudiantes guardados"}),200