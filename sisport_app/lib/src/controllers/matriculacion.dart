import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sisport_app/src/views/asignaturasDocen.dart';
import '../resources/drawer.dart' as slideBar;
import '../views/carreras.dart';

class Matriculacion extends StatefulWidget {
  @override
  _MatriculacionState createState() => _MatriculacionState();
}

class _MatriculacionState extends State<Matriculacion> {
   String tipo = "";
  String codigo = "";

  Future<String> makeRequest() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      tipo = preferences.getString('tipo');
      codigo = preferences.getString('codigo');
    });
  }

  @override
  void initState() {
    makeRequest();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: tipo=="ESTUDIANTE"? AppBar(title: Text("Matriculación")):AppBar(title: Text("Asignación de claves")),
      drawer: slideBar.MyDrawer(),
      body: tipo=="ESTUDIANTE"?Carreras() : asignaturasdocente()
        
      );
      
    
  }
}

