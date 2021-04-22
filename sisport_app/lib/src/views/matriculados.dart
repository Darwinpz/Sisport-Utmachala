import 'package:flutter/material.dart';
import 'package:sisport_app/src/resources/tree.dart';
import '../resources/drawer.dart' as slideBar;
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class matriculados extends StatefulWidget {

  final String asig_nombre;
  final String asig_codigo;
  final String peri_codigo;
  final String sem_codigo;
  const matriculados(this.asig_nombre, this.asig_codigo, this.peri_codigo, this.sem_codigo);

  @override
  matriculadosState createState() => matriculadosState();
}

class matriculadosState extends State<matriculados> {

  String token="";
  List<Note> _notes = List<Note>();

   Future<List<Note>> verMatriculados()async{

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
    });

    Map data = {'asig_codigo': widget.asig_codigo, 'peri_codigo': widget.peri_codigo, 'sem_codigo':widget.sem_codigo};


    http.Response response = await http
        .post('http://190.155.140.58:80/api/persona_asignatura/matriculados', body: data, headers: {"Authorization":"bearer "+token});


    var notes = List<Note>();

    if (response.statusCode == 200) {
      Map<String, dynamic> notesJson = json.decode(response.body);
      for (var noteJson in notesJson["message"]) {
        notes.add(Note.fromJson(noteJson));
      }
    }

    return notes;

  }

  @override
  void initState(){
    verMatriculados().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
    super.initState();
  }
  
  @override
  Widget build(BuildContext context) {

      return Scaffold(
         appBar: AppBar(title: Text(widget.asig_nombre, style: TextStyle(fontSize: 14),)),
         drawer: slideBar.MyDrawer(),
         body: _notes.length==0? Center(child: Text("Ningún alumno se ha matriculado aún.", style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic))):
          ListView.builder(
        itemBuilder: (context, index) {
          return Card(
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            margin: EdgeInsets.all(15),
            elevation: 10,
            child: new InkWell(
              child: Column(
                children: <Widget>[
                  ListTile(
                    contentPadding: EdgeInsets.fromLTRB(15, 10, 25, 0),
                    title: Text(_notes[index].per_nombre+" "+_notes[index].per_apellido),
                  ),
                  Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[

                         FlatButton(
                                  onPressed: () => { Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) => tree(
                                                  widget.asig_codigo, widget.asig_nombre, widget.peri_codigo, "",_notes[index].per_codigo.toString(), _notes[index].per_nombre, _notes[index].per_apellido, widget.sem_codigo)))},   
                                  child: Text('Ver portafolio'))
                        ],
                      )
                ],
              ),
              
            ),
          );
        },
        itemCount: _notes.length,
      ),
      );
  }
}

class Note {
  int per_codigo;
  String per_nombre;
  String per_apellido;
  
  Note(this.per_codigo, this.per_nombre, this.per_apellido);

  Note.fromJson(Map<String, dynamic> json) {
    per_codigo = json['per_codigo'];
    per_nombre = json['per_nombre'];
    per_apellido= json['per_apellido'];
    
  }
}