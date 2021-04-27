import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sisport_app/src/views/Inicio.dart';
import 'package:http/http.dart' as http;
import 'package:fluttertoast/fluttertoast.dart';
import '../resources/drawer.dart' as slideBar;
import 'dart:convert';

class informefinal extends StatefulWidget {
  final String asig_codigo;
  final String peri_codigo;
  final String per_codigo;
  final String asig_nombre;
  final String fac_abreviatura;
  final String car_abreviatura;
  final String asig_identificador_completo;
  final String peri_nombre;

  const informefinal(this.asig_codigo, this.peri_codigo, this.per_codigo, this.asig_nombre, this.fac_abreviatura, this.car_abreviatura, this.asig_identificador_completo, this.peri_nombre);

  @override
  _informefinalState createState() => _informefinalState();
}

class _informefinalState extends State<informefinal> {
  String tipo = "";
  String codigo = "";
  String token="";
  String contenido="";

  Future guardarinforme(String contenido) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      tipo = preferences.getString('tipo');
      codigo = preferences.getString('codigo');
      token= preferences.getString('token');
    });

    Map data ={'asig_codigo':widget.asig_codigo, 'peri_codigo':widget.peri_codigo, 'contenido':contenido};

     http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/informe',
        body: data,
        headers: {"Authorization": "bearer " + token});

    if(response.statusCode==200){
      Fluttertoast.showToast(
          msg: "Informe final guardado exitosamente",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 16.0);
       Navigator.push(context, MaterialPageRoute(builder: (context) => Inicio()));
    }else{
      Fluttertoast.showToast(
          msg: "Error al guardar informe final",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
       Navigator.pop(context);
    }

  }

  Future obtenerDatos()async{

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      tipo = preferences.getString('tipo');
      token=preferences.getString('token');
      codigo=preferences.getString('codigo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    Map<String, dynamic> datos = json.decode(response.body);
    
    setState(() {
       contenido =(datos['message'][0]['portafolio_data']['informe_final']['contenido'].toString());
             
    });

  }

  Future generateInforme(String contenido) async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      tipo = preferences.getString('tipo');
      token=preferences.getString('token');
      codigo=preferences.getString('codigo');
    });

    Map<String, dynamic> data = {
      'fac_abreviatura':widget.fac_abreviatura,
      'car_abreviatura':widget.car_abreviatura,
      'asig_abreviatura':widget.asig_identificador_completo,
      //'per_cedula': est_cedula,
      'contenido': contenido,
      //'estructura':[{'docente': docente, 'peri_nombre':}]
    };


    http.Response response = await http.post(
        'http://190.155.140.58:4555/generate/informe',
        body:  json.encode(data), headers: { 'Content-type': 'application/json',
      'Accept': 'application/json',"Authorization":"bearer "+token});


  }

  @override
  void initState() {
    obtenerDatos();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    TextEditingController contenidocontroller = TextEditingController();
    contenidocontroller.text=contenido;
    return Scaffold(
      appBar: AppBar(title: Column(children: [
        Text(
          widget.asig_nombre, style: TextStyle(fontSize: 14),
        ),
        GestureDetector(
          child: Text("Informe final", style: TextStyle(fontSize: 12),),
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
                  "REDACCIÓN DE EXPERIENCIAS DURANTE EL CURSO: ",
                  style: TextStyle(fontWeight: FontWeight.bold),
                  textAlign: TextAlign.left,
                ),
              ),
              tipo=="ESTUDIANTE"?
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: contenidocontroller,
                  maxLines: 25,
                    decoration: InputDecoration(
                        filled: true,
                        enabled: true,
                        fillColor: Colors.white,
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ):Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: contenidocontroller,
                  maxLines: 25,
                    decoration: InputDecoration(
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
                      onPressed: () {guardarinforme(contenidocontroller.text);},
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