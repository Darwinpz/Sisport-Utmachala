import 'package:flutter/material.dart';
import 'drawer.dart' as slideBar;
import 'carreras.dart';

class Matriculacion extends StatefulWidget {
  @override
  _MatriculacionState createState() => _MatriculacionState();
}

class _MatriculacionState extends State<Matriculacion> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Matriculación")),
      drawer: slideBar.MyDrawer(),
      body: Carreras()
        
      );
      
    
  }
}

