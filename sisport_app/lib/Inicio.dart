import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'drawer.dart' as slideBar;
import './Estructura/tree.dart';
import './Estructura/treeDocen.dart';

class Inicio extends StatefulWidget {
  @override
  _InicioState createState() => _InicioState();
}

class _InicioState extends State<Inicio> {
  String token = "";
  String tipo = "";

  List<Note> _notes = List<Note>();

  Future<List<Note>> getDatosPer() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      tipo = preferences.getString('tipo');
    });

    var response = await http.get(
        'http://190.155.140.58:80/api/persona_asignatura',
        headers: {"Authorization": "bearer " + token});

    var notes = List<Note>();

    if (response.statusCode == 200) {
      Map<String, dynamic> notesJson = json.decode(response.body);
      
      for (var noteJson in notesJson["message"][0]["asignaturas"]) {
        notes.add(Note.fromJson(noteJson));
      }

    } else if (response.statusCode == 403) {
      Fluttertoast.showToast(
          msg: "Su sesión ha caducado. Por favor ingrese sesión nuevamente.",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }

    return notes;
  }

  @override
  void initState() {
    getDatosPer().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Mis portafolios")),
        drawer: slideBar.MyDrawer(),
        body: _notes.length==0? tipo=="ESTUDIANTE"?Center(child: Text("No tienes portafolios aún. Ve al menú Matriculación.", style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic))):Center(child: Text("No tiene portafolios aún. Diríjase al menú Asignar claves.", style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic))):
        ListView.builder(
          itemBuilder: (context, index) {
            return Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              margin: EdgeInsets.all(15),
              elevation: 10,
              child: new InkWell(
                child: Column(
                  children: <Widget>[
                    Padding(padding: EdgeInsets.only(bottom: 3)),
                    ListTile(
                      contentPadding: EdgeInsets.fromLTRB(15, 10, 25, 0),
                      title: Text(_notes[index].asig_nombre),
                      subtitle: Text(_notes[index].sem_nombre +
                          " " +
                          _notes[index].sem_paralelo +
                          "\n" +
                          _notes[index].docente),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: <Widget>[
                        tipo == "ESTUDIANTE"
                            ? FlatButton(
                                onPressed: () => {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) => tree(
                                                  _notes[index].asig_codigo.toString(), _notes[index].asig_nombre, _notes[index].peri_codigo.toString(), _notes[index].docente)))
                                    },
                                child: Text('Ver portafolio'))
                            : FlatButton(
                                onPressed: () => {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) => treeDocen(
                                                  _notes[index].asig_nombre,
                                                  (_notes[index].asig_codigo)
                                                      .toString(),
                                                  (_notes[index].peri_codigo)
                                                      .toString())))
                                    },
                                child: Text('Ver portafolios'))
                        // FlatButton(
                        //     onPressed: () => {}, child: Text('Cancelar'))
                      ],
                    )
                  ],
                ),
              ),
            );
          },
          itemCount: _notes.length,
        ));
  }
}

class Note {
  String asig_nombre;
  String sem_nombre;
  String sem_paralelo;
  int asig_codigo;
  String docente;
  int peri_codigo;

  Note(this.asig_nombre, this.sem_nombre, this.sem_paralelo, this.asig_codigo,
      this.docente, this.peri_codigo);

  Note.fromJson(Map<String, dynamic> json) {
    asig_nombre = json['asig_nombre'];
    sem_nombre = json['sem_nombre'];
    sem_paralelo = json['sem_paralelo'];
    asig_codigo = json['asig_codigo'];
    docente = json['docente'];
    peri_codigo = json['peri_codigo'];
  }
}
