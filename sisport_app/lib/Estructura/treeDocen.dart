import 'package:flutter/material.dart';
import '../drawer.dart' as slideBar;
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'diario.dart';

class treeDocen extends StatefulWidget {

  final String asig_nombre;
  final String asig_codigo;
  final String peri_codigo;
  const treeDocen(this.asig_nombre, this.asig_codigo, this.peri_codigo);

  @override
  treeDocenState createState() => treeDocenState();
}

class treeDocenState extends State<treeDocen> {

  String token="";
  List<Note> _notes = List<Note>();

   Future<List<Note>> verMatriculados()async{

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
    });

    Map data = {'asig_codigo': widget.asig_codigo, 'peri_codigo': widget.peri_codigo};

    http.Response response = await http
        .post('http://190.155.140.58:80/api/persona_asignatura/matriculados', body: data, headers: {"Authorization":"bearer "+token});

    Map<String, dynamic> datos = json.decode(response.body);

    debugPrint("aber2: "+datos.toString());

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
         appBar: AppBar(title: Text(widget.asig_nombre)),
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
                                  onPressed: () => { },   
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