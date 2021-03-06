import 'package:flutter/material.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:sisport_app/src/resources/expectativas.dart';
import 'package:sisport_app/src/resources/informefinal.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'drawer.dart' as slideBar;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'diario.dart';

class tree extends StatefulWidget {
  final String asig_codigo;
  final String asig_nombre;
  final String peri_codigo;
  final String docente;
  final String per_codigo;
  final String per_nombre;
  final String per_apellido;
  final String sem_codigo;
  final String car_nombre;
  const tree(this.asig_codigo, this.asig_nombre, this.peri_codigo, this.docente, this.per_codigo, this.per_nombre, this.per_apellido, this.sem_codigo, this.car_nombre);

  @override
  treeState createState() => treeState();
}

class treeState extends State<tree> {
  String token = "";
  String codigo = "";
  String tipo="";

  var esquema_abreviatura="";
  var abreviaturas="";
  String car_abreviatura="";
  String fac_abreviatura="";
  String asig_identificador="";
  String est_cedula="";
  String urlArchivo="";
  String periodo="";
  String asig_identificador_completo="";
  String informativos="";
  String sem_nombre="";
  String peri_nombre="";


  var syllabus="";
  var asistencia="";
  var diarios=[];

  List<Note> _notes = List<Note>();
  List<Note2> _notes2 = List<Note2>();
  List<Note2> _notes3 = List<Note2>();
  List<Note2> _notes4 = List<Note2>();
  List<Note2> _notes5 = List<Note2>();
  List<Note2> _notes6 = List<Note2>();
  List<Note2> _notes7 = List<Note2>();
  List<Note2> _notes9 = List<Note2>();
  List<Note2> _notes10 = List<Note2>();
  List<Note2> _notes11 = List<Note2>();
  List<Note2> _notes12 = List<Note2>();


  Future<List<Note>> buscarPortafolio() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes = List<Note>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['apuntes']) {
        notes.add(Note.fromJson(dato));
      }
    }

    return notes;
  }


  Future<List<Note2>> buscarevaluaciones() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes2 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['evaluaciones']) {
        notes2.add(Note2.fromJson(dato));
      }
    }
    return notes2;
  }

    Future<List<Note2>> buscarinvestigaciones() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes3 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['investigaciones']) {
        notes3.add(Note2.fromJson(dato));
      }
    }
    return notes3;
  }

    Future<List<Note2>> buscaractividades() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes4 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['actividades']) {
        notes4.add(Note2.fromJson(dato));
      }
    }
    return notes4;
  }

  Future<List<Note2>> buscarproyectos() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes5 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['proyectos']) {
        notes5.add(Note2.fromJson(dato));
      }
    }
    return notes5;
  }

  Future<List<Note2>> buscarestudios() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes6 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['casos_estudio']) {
        notes6.add(Note2.fromJson(dato));
      }
    }
    return notes6;
  }

  Future<List<Note2>> buscarplanteamientos() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes7 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['planteamientos']) {
        notes7.add(Note2.fromJson(dato));
      }
    }
    return notes7;
  }

  Future buscarasistencia() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});


    Map<String, dynamic> datos = json.decode(response.body);
    setState(() {
      asistencia=datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['asistencia']['nombre_archivo'].toString();
    });

  
  }

  Future<List<Note2>> buscarobservaciones() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes9 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['observaciones']) {
        notes9.add(Note2.fromJson(dato));
      }
    }
    return notes9;
  }

  Future<List<Note2>> buscarintraclases() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes10 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['intraclases']) {
        notes10.add(Note2.fromJson(dato));
      }
    }
    return notes10;
  }

  Future<List<Note2>> buscarautonomas() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

   Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes11 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['autonomos']) {
        notes11.add(Note2.fromJson(dato));
      }
    }
    return notes11;
  }

  Future<List<Note2>> buscarrefuerzo() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes12 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['refuerzo']) {
        notes12.add(Note2.fromJson(dato));
      }
    }
    return notes12;
  }

  Future buscarsyllabus() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    setState(() {
      Map<String, dynamic> datos = json.decode(response.body);
      syllabus=datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['syllabus']['nombre_archivo'].toString();
    });
  }

  Future buscarInformativos() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

   Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    setState(() {
      Map<String, dynamic> datos = json.decode(response.body);
      informativos=(datos['message'][0]['portafolio_data']
          ['datos_informativos']['informativos'].toString());
    });
  }

  Future getEsquema() async{

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var datos = json.decode(response.body);
     setState(() {
      esquema_abreviatura=(datos['message'][0]['nombre_esquema'].toString());
      abreviaturas= esquema_abreviatura;
      fac_abreviatura=abreviaturas.toString().split(".")[0];
      car_abreviatura=(abreviaturas.toString().split(".")[1]);
      asig_identificador=(datos['message'][0]['estructura']['identificador'].toString());
      est_cedula=(datos['message'][0]['estudiante']['per_cedula'].toString());
      periodo=(datos['message'][0]['estructura']['periodo'].toString());
      asig_identificador_completo=asig_identificador+"-"+periodo+"-"+widget.sem_codigo;
     });
  }

  Future generateDocs() async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      tipo = preferences.getString('tipo');
      token=preferences.getString('token');
      codigo=preferences.getString('codigo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      setState(() {
         diarios= datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['apuntes'];
      });
     
    }

    Map data2 = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'sem_codigo': widget.sem_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response2 = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data2,
        headers: {"Authorization": "bearer " + token});

    var datos = json.decode(response.body);
     setState(() {
      esquema_abreviatura=(datos['message'][0]['nombre_esquema'].toString());
      abreviaturas= esquema_abreviatura;
      fac_abreviatura=abreviaturas.toString().split(".")[0];
      car_abreviatura=(abreviaturas.toString().split(".")[1]);
      asig_identificador=(datos['message'][0]['estructura']['identificador'].toString());
      est_cedula=(datos['message'][0]['estudiante']['per_cedula'].toString());
      periodo=(datos['message'][0]['estructura']['periodo'].toString());
      asig_identificador_completo=asig_identificador+"-"+periodo+"-"+widget.sem_codigo;
      sem_nombre=(datos['message'][0]['extras']['sem_nombre'].toString());
      peri_nombre=(datos['message'][0]['extras']['peri_nombre'].toString());
     });

     Map data3 = {'car_nombre': widget.car_nombre};
    
    var url = 'http://190.155.140.58:80/api/asignatura/buscar';
    var response3 = await http.post(url, body: data3, headers: {"Authorization":"bearer "+token});
    Map<String, dynamic> notesJson = json.decode(response.body);

    var estructura={'per_nombre':notesJson["message"][0]["estudiante"]['per_nombre'].toString()+" "+notesJson["message"][0]["estudiante"]['per_apellido'].toString(), 'asig_nombre':widget.asig_nombre, 'sem_nombre': sem_nombre, 
    'docente':notesJson["message"][0]["estructura"]['nombre_docente'].toString(), 'peri_nombre':peri_nombre};

    Map data4={
      'fac_abreviatura':fac_abreviatura,
      'car_abreviatura':car_abreviatura,
      'asig_abreviatura':asig_identificador_completo,
      'per_cedula': est_cedula,
      'diarios': (diarios),
      'estructura':  (estructura)
    };

    var data4Json= json.encode(data4);

    http.Response response4 = await http.post(
        'http://190.155.140.58:4555/generate/diario',
        body:  data4Json, headers: { 'Content-type': 'application/json',
      'Accept': 'application/json'});


    Map data5={
      'fac_abreviatura':fac_abreviatura,
      'car_abreviatura':car_abreviatura,
      'asig_abreviatura':asig_identificador_completo,
      'per_cedula': est_cedula,
      'contenido': datos['message'][0]['portafolio_data']
          ['informe_final']['contenido'],
      'estructura':  (estructura)
    };

    var data5Json= json.encode(data5);

    http.Response response5 = await http.post(
        'http://190.155.140.58:4555/generate/informe',
        body:  data5Json, headers: { 'Content-type': 'application/json',
      'Accept': 'application/json'});


    Map data6={
      'fac_abreviatura':fac_abreviatura,
      'car_abreviatura':car_abreviatura,
      'asig_abreviatura':asig_identificador_completo,
      'per_cedula': est_cedula,
      'contenido': datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['expectativas']['contenido'],
      'estructura':  (estructura)
    };

    var data6Json= json.encode(data6);

    http.Response response6 = await http.post(
        'http://190.155.140.58:4555/generate/expectativas',
        body:  data6Json, headers: { 'Content-type': 'application/json',
      'Accept': 'application/json'});


  }

  Future getUrlFile(String tipo_archivo, nombre_archivo) async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map<String, dynamic> data = {
      'fac_abreviatura':fac_abreviatura,
      'car_abreviatura':car_abreviatura,
      'asig_abreviatura':asig_identificador_completo,
      'per_cedula':est_cedula,
      'tipo_archivo': tipo_archivo,
      'nombre_archivo':nombre_archivo
    };

    http.Response response = await http.post(
        'http://190.155.140.58:4555/download/archivo',
        body: json.encode(data), headers: { 'Content-type': 'application/json',
      'Accept': 'application/json',"Authorization":"bearer "+token});

    var datos = json.decode(response.body);

    if(response.statusCode==200){
      setState(() {
        urlArchivo=datos['message'].toString();
      });
    }else{
      Fluttertoast.showToast(
          msg: "Error al descargar archivo",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      Navigator.pop(context);
    }
  }

  Future descargarPortafolio()async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map<String, dynamic> data = {
      'fac_abreviatura':fac_abreviatura,
      'car_abreviatura':car_abreviatura,
      'asig_abreviatura':asig_identificador_completo,
      'per_cedula':est_cedula
    };

     http.Response response = await http.post(
        'http://190.155.140.58:4555/download/portafolio',
        body: json.encode(data), headers: { 'Content-type': 'application/json',
      'Accept': 'application/json',"Authorization":"bearer "+token, "Cache-Control": "no-cache"});
    
    var datos = json.decode(response.body);

    if(response.statusCode==200){
      setState(() {
        urlArchivo=datos['message'].toString();
      });
    }else{
      Fluttertoast.showToast(
          msg: "Error al descargar archivo",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      Navigator.pop(context);
    }
  
  }

  @override
  void initState() {
    buscarPortafolio().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
    buscarevaluaciones().then((value) {
      setState(() {
        _notes2.addAll(value);
      });
    });
    buscarinvestigaciones().then((value) {
      setState(() {
        _notes3.addAll(value);
      });
    });
    buscaractividades().then((value) {
      setState(() {
        _notes4.addAll(value);
      });
    });
    buscarproyectos().then((value) {
      setState(() {
        _notes5.addAll(value);
      });
    });
    buscarestudios().then((value) {
      setState(() {
        _notes6.addAll(value);
      });
    });
    buscarplanteamientos().then((value) {
      setState(() {
        _notes7.addAll(value);
      });
    });
    buscarasistencia();
    buscarobservaciones().then((value) {
      setState(() {
        _notes9.addAll(value);
      });
    });
    buscarintraclases().then((value) {
      setState(() {
        _notes10.addAll(value);
      });
    });
    buscarautonomas().then((value) {
      setState(() {
        _notes11.addAll(value);
      });
    });
    buscarrefuerzo().then((value) {
      setState(() {
        _notes12.addAll(value);
      });
    });
    buscarsyllabus();
    buscarInformativos();
    getEsquema();
    generateDocs();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
        appBar: tipo=="ESTUDIANTE"? AppBar(title: Text(widget.asig_nombre, style: TextStyle(fontSize: 14),)):AppBar(title: Column(children: [
        Text(
          widget.asig_nombre, style: TextStyle(fontSize: 14),
        ),
        GestureDetector(
          child: Text('ESTUDIANTE: '+widget.per_nombre+" "+widget.per_apellido, style: TextStyle(fontSize: 12),),
          onTap: () {
            
          },
        )
      ])),
        drawer: slideBar.MyDrawer(),
        body:  SingleChildScrollView(
          child: Stack(children: <Widget>[
                    Padding(
        padding: const EdgeInsets.symmetric(horizontal: 30.0),
        child: Column(
          children: <Widget>[
            SizedBox(height:20.0),
            ExpansionTile(
              title: Text(
                "1. Datos informativos",
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold
                ),
              ),
              children: <Widget>[
                ListTile(
                  title: Text(
                  informativos, 
                  ),leading: Icon(Icons.menu_book_outlined),onTap: ()async{
                        await getUrlFile('informativos', informativos);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: informativos, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                )
              ],
            ),
            ExpansionTile(
              title: Text(
                "2. Elementos curriculares",
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold
                ),
              ),
              children: <Widget>[
                ExpansionTile(
                  title: Text(
                    'a) Syllabus',
                  ),
                  children: <Widget>[
                    syllabus!=" "?
                   ListTile(
                      title: Text(syllabus),
                       leading: Icon(Icons.menu_book_outlined),
                       onTap: ()async{
                        await getUrlFile('syllabus', syllabus);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: syllabus, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    ):ListTile(title: Text("Aún no se ha subido archivo")),
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'b) Expectativas',
                  ),
                  children: <Widget>[
                     ListTile(
                       title: Text("Expectativas"),
                       leading: Icon(Icons.menu_book_outlined),
                       onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context)=>expectativas(widget.asig_codigo, widget.peri_codigo, widget.per_codigo, widget.asig_nombre)));},
                     )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'c) Apuntes de clase',
                  ),
                  children: <Widget>[
                      ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text('DIARIO METACOGNITIVO '+_notes[index].num_diario.toString()),
                      leading: Icon(Icons.book),
                      onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context)=>Diario("DIARIO METACOGNITIVO "+_notes[index].num_diario.toString(), _notes[index].num_diario.toString(), _notes[index].tiempo.toString(), _notes[index].fecha, tipo=="ESTUDIANTE"? codigo: widget.per_codigo, widget.asig_codigo, widget.asig_nombre, widget.peri_codigo, fac_abreviatura, car_abreviatura, asig_identificador_completo, est_cedula)));},
                    );
                    },  itemCount: _notes.length,)                 
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'd) Evaluaciones',
                  ),
                  children: <Widget>[
                     ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes2[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('evaluaciones', _notes2[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes2[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes2.length,)

                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'e) Investigaciones',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes3[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('investigaciones', _notes3[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes3[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes3.length,)

                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'f) Actividades de experimentación',
                  ),
                  children: <Widget>[
                     ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes4[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('actividades', _notes4[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes4[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes4.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'g) Proyectos',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes5[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('proyectos', _notes5[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes5[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes5.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'h) Estudios de caso',
                  ),
                  children: <Widget>[
                     ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes6[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('casos_estudio', _notes6[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes6[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes6.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'i) Planteamiento de problemas',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes7[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('planteamientos', _notes7[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes7[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes7.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'j) Registro de asistencia',
                  ),
                  children: <Widget>[
                    ListTile(
                      title:Text(asistencia),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('asistencia', asistencia);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: asistencia, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'k) Registro de observaciones',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes9[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('observaciones', _notes9[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes9[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes9.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'l) Tareas intraclases',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes10[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('intraclases', _notes10[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes10[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes10.length,)
                    
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'm) Tareas autónomas',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes11[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('autonomos', _notes11[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes11[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes11.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'n) Tareas de refuerzo',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes12[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: ()async{
                        await getUrlFile('refuerzos', _notes12[index].nombre_archivo);
                         final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, fileName: _notes12[index].nombre_archivo, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                    );
                    },  itemCount: _notes12.length,)
                  ],
                ),
              ],
            ),
            ExpansionTile(
              title: Text(
                "3. Informe final",
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold
                ),
              ),
              children: <Widget>[
                ListTile(
                  title: Text(
                    'Informe final',
                  ),leading: Icon(Icons.menu_book_outlined),
                  onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context)=>informefinal(widget.asig_codigo, widget.peri_codigo, widget.per_codigo, widget.asig_nombre, fac_abreviatura, car_abreviatura, asig_identificador_completo, est_cedula)));},
                )
              ],
            ),
            MaterialButton(
                      color: Colors.green,
                      onPressed: ()async{
                        await buscarPortafolio();
                        buscarPortafolio().then((value) {
                          setState(() {
                            _notes.addAll(value);
                          });
                        });
                        await buscarevaluaciones().then((value) {
                          setState(() {
                            _notes2.addAll(value);
                          });
                        });
                        await buscarinvestigaciones().then((value) {
                          setState(() {
                            _notes3.addAll(value);
                          });
                        });
                        await buscaractividades().then((value) {
                          setState(() {
                            _notes4.addAll(value);
                          });
                        });
                        await buscarproyectos().then((value) {
                          setState(() {
                            _notes5.addAll(value);
                          });
                        });
                        await buscarestudios().then((value) {
                          setState(() {
                            _notes6.addAll(value);
                          });
                        });
                        await buscarplanteamientos().then((value) {
                          setState(() {
                            _notes7.addAll(value);
                          });
                        });
                        await buscarasistencia();
                        await buscarobservaciones().then((value) {
                          setState(() {
                            _notes9.addAll(value);
                          });
                        });
                        await buscarintraclases().then((value) {
                          setState(() {
                            _notes10.addAll(value);
                          });
                        });
                        await buscarautonomas().then((value) {
                          setState(() {
                            _notes11.addAll(value);
                          });
                        });
                        await buscarrefuerzo().then((value) {
                          setState(() {
                            _notes12.addAll(value);
                          });
                        });
                        await buscarsyllabus();
                        await buscarInformativos();
                        await getEsquema();
                        await generateDocs();
                        await descargarPortafolio();
                        final status= await Permission.storage.request();
                         if(status.isGranted){
                           final externalDir = await getExternalStorageDirectory();
                            String ruta = Uri.encodeFull(urlArchivo);
                            final id = await FlutterDownloader.enqueue(url: ruta, savedDir: externalDir.path, showNotification: true, openFileFromNotification: true,);
                         }else{
                           print("Permiso negado");
                         }
                       },
                      height: 50,
                      minWidth: 400,
                      shape: RoundedRectangleBorder(
                          borderRadius: new BorderRadius.circular(30.0)),
                      child: Text('Descargar portafolio',
                          style: TextStyle(color: Colors.white, fontSize: 17)),
                    ),
          ],
        ),
      ),
          ],),
        ),);
  }
}


class Note {
  int num_diario;
  String tiempo;
  String fecha;
  String unidad;
  String tema;
  String problema;
  String contenidos;
  String objetivos;
  String actividades;
  String estrategias;
  String resumen;
  String reflexion;
  String anexos;

  Note(
      this.num_diario,
      this.tiempo,
      this.fecha,
      this.unidad,
      this.tema,
      this.problema,
      this.contenidos,
      this.objetivos,
      this.actividades,
      this.estrategias,
      this.resumen,
      this.reflexion,
      this.anexos);

  Note.fromJson(Map<String, dynamic> json) {
    num_diario = json['num_diario'];
    tiempo = json['tiempo'];
    fecha = json['fecha'];
    unidad = json['unidad'];
    tema = json['tema'];
    problema = json['problema'];
    contenidos = json['contenidos'];
    objetivos = json['objetivos'];
    actividades = json['actividades'];
    estrategias = json['estrategias'];
    resumen = json['resumen'];
    reflexion = json['reflexion'];
    anexos = json['anexos'];
  }
}

class Note2{
  String nombre_archivo;

  Note2(this.nombre_archivo);

  Note2.fromJson(Map<String, dynamic> json) {
     nombre_archivo=json['nombre_archivo'];
   }

}
