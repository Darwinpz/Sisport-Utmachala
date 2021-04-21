import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sisport_app/src/views/Inicio.dart';
import 'package:intl/intl.dart';
import 'drawer.dart' as slideBar;
import 'package:http/http.dart' as http;
import 'dart:convert';

class Diario extends StatefulWidget {
  final String diario_name;
  final String num_clase;
  final String tiempo;
  final String fecha;
  final String per_codigo;
  final String asig_codigo;
  final String asig_nombre;
  final String peri_codigo;


  const Diario(this.diario_name, this.num_clase, this.tiempo, this.fecha, this.per_codigo, this.asig_codigo, this.asig_nombre, this.peri_codigo);

  @override
  _DiarioState createState() => _DiarioState();
}

class _DiarioState extends State<Diario> {

  String tipo="";
  String token="";
  String codigo="";
  var docente="";
  String temaD="";
  String contenidosD="";
  String objetivosD="";
  String actividadesD="";
  String estrategiasD="";
  String resumenD="";
  String preg1D="";
  String preg2D="";
  String preg3D="";
  String preg4D="";
  String periodo_inicio;
  String periodo_fin;
  String replaced_inicio;
  String replaced_fin;



  Future obtenerDocente()async{

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      tipo = preferences.getString('tipo');
      token=preferences.getString('token');
      codigo=preferences.getString('codigo');
    });

    
    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': widget.per_codigo
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    Map<String, dynamic> datos = json.decode(response.body);
    //debugPrint("resultado: "+datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'].toString());
    
    setState(() {
       docente =(datos['message'][0]['estructura']['nombre_docente']);
       periodo_inicio=(datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['periodo_inicio']);
       replaced_inicio = periodo_inicio.replaceFirst(RegExp('T05:00:00.000Z'), ''); 
       periodo_fin=(datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['periodo_fin']);
       replaced_fin = periodo_fin.replaceFirst(RegExp('T05:00:00.000Z'), ''); 
       temaD=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['tema'];
       contenidosD=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['contenidos'];
       objetivosD=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['objetivos'];
       actividadesD=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['actividades'];
       estrategiasD=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['estrategias'];
       resumenD=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['resumen'];
       preg1D=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['preg1'];
       preg2D=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['preg2'];
       preg3D=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['preg3'];
       preg4D=datos['message'][0]['portafolio_data']['elementos_curriculares']['apuntes'][(int.parse(widget.num_clase)-1)]['preg4'];
             
    });


  }

  Future guardarDiario(String tema, contenidos, objetivos, actividades, estrategias, resumen, preg1, preg2, preg3, preg4)async {
     SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      tipo = preferences.getString('tipo');
      token=preferences.getString('token');
      codigo=preferences.getString('codigo');
    });

    Map data = {
      'asig_codigo':widget.asig_codigo,
      'peri_codigo':widget.peri_codigo,
      'num_diario':widget.num_clase,
      'tema': tema,
      'contenidos': contenidos,
      'objetivos': objetivos,
      'actividades':actividades,
      'estrategias':estrategias,
      'resumen':resumen,
      'preg1':preg1,
      'preg2':preg2,
      'preg3':preg3,
      'preg4':preg4
    };


    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/diario',
        body: data,
        headers: {"Authorization": "bearer " + token});

    if(response.statusCode==200){
      Fluttertoast.showToast(
          msg: "Diario guardado exitosamente",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 16.0);
      Navigator.push(context, MaterialPageRoute(builder: (context) => Inicio()));
    }else{
      Fluttertoast.showToast(
          msg: "Error al guardar datos del diario",
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
  void initState(){
    obtenerDocente();
    super.initState();
  }

  
  @override
  Widget build(BuildContext context) {
    TextEditingController tema = TextEditingController();
    tema.text=temaD;
    TextEditingController contenidos = TextEditingController();
    contenidos.text=contenidosD;
    TextEditingController objetivos = TextEditingController();
    objetivos.text=objetivosD;
    TextEditingController actividades = TextEditingController();
    actividades.text=actividadesD;
    TextEditingController estrategias = TextEditingController();
    estrategias.text=estrategiasD;
    TextEditingController resumen = TextEditingController();
    resumen.text=resumenD;
    TextEditingController preg1 = TextEditingController();
    preg1.text=preg1D;
    TextEditingController preg2 = TextEditingController();
    preg2.text=preg2D;
    TextEditingController preg3 = TextEditingController();
    preg3.text=preg3D;
    TextEditingController preg4 = TextEditingController();
    preg4.text=preg4D;
    
    return Scaffold(
      appBar: AppBar(title: Column(children: [
        Text(
          widget.asig_nombre, style: TextStyle(fontSize: 14),
        ),
        GestureDetector(
          child: Text(widget.diario_name, style: TextStyle(fontSize: 12),),
          onTap: () {
            
          },
        )
      ])),
      drawer: slideBar.MyDrawer(),
      body: SingleChildScrollView(
          child: Stack(
        children: <Widget>[
          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "CLASE N°: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    decoration: InputDecoration(
                        hintText: widget.num_clase,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "PERIODO:",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    decoration: InputDecoration(
                        hintText: replaced_inicio.toString()+" al "+replaced_fin.toString(),
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "TIEMPO: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    decoration: InputDecoration(
                        hintText: widget.tiempo,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "FECHA:",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    decoration: InputDecoration(
                        hintText: widget.fecha,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "DOCENTE: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    decoration: InputDecoration(
                        hintText: docente,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "TEMA: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: tema,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    decoration: InputDecoration(
                        hintText: temaD,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "CONTENIDOS: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: contenidos,
                    maxLines: 8,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 8,
                    decoration: InputDecoration(
                        hintText: contenidosD,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "OBJETIVOS: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: objetivos,
                    maxLines: 2,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        hintText: objetivosD,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "ACTIVIDADES DE CLASE: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: actividades,
                    maxLines: 8,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 8,
                    decoration: InputDecoration(
                        hintText: actividadesD,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "ESTRATEGIAS: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: estrategias,
                    maxLines: 8,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 8,
                    decoration: InputDecoration(
                        hintText: estrategiasD,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "RESUMEN CONCEPTUAL: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: resumen,
                    maxLines: 20,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 20,
                    decoration: InputDecoration(
                        hintText: resumenD,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "REFLEXIÓN: " + "\n" + "•	¿Qué cosas fueron difíciles?",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: preg1,
                    maxLines: 2,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        hintText: preg1D,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "•	¿Cuáles fueron fáciles?",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: preg2,
                    maxLines: 2,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        hintText: preg2D,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "•	¿Por qué?",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: preg3,
                    maxLines: 2,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        hintText: preg3D,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "•	¿Qué aprendí hoy?",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: preg4,
                    maxLines: 2,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        hintText: preg4D,
                        filled: true,
                        enabled: false,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),

              if (tipo=='ESTUDIANTE') Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  new Center(
                    child: MaterialButton(
                      color: Colors.green,
                      onPressed: () {guardarDiario(tema.text, contenidos.text, objetivos.text, actividades.text, estrategias.text, resumen.text, preg1.text, preg2.text, preg3.text, preg4.text);},
                      height: 50,
                      minWidth: 400,
                      shape: RoundedRectangleBorder(
                          borderRadius: new BorderRadius.circular(30.0)),
                      child: Text('Guardar',
                          style: TextStyle(color: Colors.white, fontSize: 17)),
                    ),
                  )
                ],
              )
            ],
          )
        ],
      )),
    );
  }
}
