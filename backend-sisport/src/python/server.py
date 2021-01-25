
from flask import Flask, request, jsonify
#from flask_cors import CORS, cross_origin
from controlador import uploadPersona, uploadSyllabus, uploadEvaluacion, uploadInvestigacion, uploadActividad, \
uploadProyecto, uploadCasoEstudio, uploadPlanteamiento, uploadAsistencia, uploadObservacion, uploadIntraclase, \
uploadAutonomo, uploadRefuerzo

app = Flask(__name__,static_folder='./resources')
#CORS(app, resources={r"/*": {"origins": "*"}})
#app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAX_CONTENT_LENGTH'] =  3 * 1024 * 1024
app.config['EXTENSIONS_PERSONA'] = ['.xls', '.csv', '.xlsx']
app.config['EXTENSIONS_SYLLABUS_ASISTENCIAS']=[".pdf", ".doc", ".docx"]; 
app.config['EXTENSIONS_EVALUACIONES']= [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".zip", ".rar"]; 
app.config['EXTENSIONS_OTROS'] = [".pdf", ".doc", ".docx", ".zip", ".rar"]; 
app.config['EXTENSIONS_INTRA_EXTRA']= [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".zip", ".rar"]; 

@app.route('/upload/persona', methods=['POST'])
def persona():
    return uploadPersona(request, app.config['EXTENSIONS_PERSONA'])

@app.route('/upload/syllabus', methods=['POST'])
def syllabus():
    return uploadSyllabus(request, app.config['EXTENSIONS_SYLLABUS_ASISTENCIAS'])

@app.route('/upload/evaluacion', methods=['POST'])
def evaluacion():
    return uploadEvaluacion(request, app.config['EXTENSIONS_EVALUACIONES'])

@app.route('/upload/investigacion', methods=['POST'])
def investigacion():
    return uploadInvestigacion(request, app.config['EXTENSIONS_OTROS'])

@app.route('/upload/actividad', methods=['POST'])
def actividad():
    return uploadActividad(request, app.config['EXTENSIONS_OTROS'])

@app.route('/upload/proyecto', methods=['POST'])
def proyecto():
    return uploadProyecto(request, app.config['EXTENSIONS_OTROS'])

@app.route('/upload/caso_estudio', methods=['POST'])
def caso_estudio():
    return uploadCasoEstudio(request, app.config['EXTENSIONS_OTROS'])

@app.route('/upload/planteamiento', methods=['POST'])
def planteamiento():
    return uploadPlanteamiento(request, app.config['EXTENSIONS_OTROS'])

@app.route('/upload/asistencia', methods=['POST'])
def asistencia():
    return uploadAsistencia(request, app.config['EXTENSIONS_SYLLABUS_ASISTENCIAS'])

@app.route('/upload/observacion', methods=['POST'])
def observacion():
    return uploadObservacion(request, app.config['EXTENSIONS_OTROS'])

@app.route('/upload/intraclase', methods=['POST'])
def intraclase():
    return uploadIntraclase(request, app.config['EXTENSIONS_INTRA_EXTRA'])

@app.route('/upload/autonomo', methods=['POST'])
def autonomo():
    return uploadAutonomo(request, app.config['EXTENSIONS_INTRA_EXTRA'])

@app.route('/upload/refuerzo', methods=['POST'])
def refuerzo():
    return uploadRefuerzo(request, app.config['EXTENSIONS_INTRA_EXTRA'])

@app.errorhandler(413)
def archivo_pesado(e):
    return jsonify({"message":"peso de archivo sobrepasado. Maximo 3MB"}), 413

if __name__ == '__main__':
    app.run(port=4555, debug=True)
