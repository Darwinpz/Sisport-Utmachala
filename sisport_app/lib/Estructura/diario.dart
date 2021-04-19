import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../drawer.dart' as slideBar;
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
    
    setState(() {
       docente =(datos['message'][0]['estructura']['nombre_docente']);
    });


  }

  @override
  void initState(){
    obtenerDocente();
    super.initState();
  }
  
  @override
  Widget build(BuildContext context) {
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
                        labelText: widget.num_clase,
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
                        labelText: '',
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
                        labelText: widget.tiempo,
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
                        labelText: widget.fecha,
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
                        labelText: docente,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 8,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "OBJETIVO: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 8,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 8,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 20,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                    maxLines: 2,
                    decoration: InputDecoration(
                        labelText: '',
                        filled: true,
                        enabled: true,
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
                      onPressed: () {},
                      height: 50,
                      minWidth: 365,
                      shape: RoundedRectangleBorder(
                          borderRadius: new BorderRadius.circular(30.0)),
                      child: Text('Guardar',
                          style: TextStyle(color: Colors.white, fontSize: 16)),
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
