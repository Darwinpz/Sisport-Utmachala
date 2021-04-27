import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sisport_app/src/views/asignaturas.dart';
import 'dart:convert';

class Carreras extends StatefulWidget {
  @override
  _CarrerasState createState() => _CarrerasState();
}

class _CarrerasState extends State<Carreras> {

  String token="";

  Future getDatosPer()async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
    });
  }

  List<Note> _notes = List<Note>();

  Future<List<Note>> fecthNotes() async {


    var url = 'http://190.155.140.58:80/api/carrera';
    var response = await http.get(url, headers: {"Authorization":"bearer "+token});

    var notes = List<Note>();

    if (response.statusCode == 200) {
      var notesJson = json.decode(response.body);
      for (var noteJson in notesJson["message"]) {
        notes.add(Note.fromJson(noteJson));
      }

      Fluttertoast.showToast(
          msg: "Escoga su carrera",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 16.0);
      
      print(notesJson);
    }
    return notes;
  }

  @override
  void initState(){
    fecthNotes().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
    getDatosPer();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: RefreshIndicator(onRefresh: (){return Future.delayed(Duration(seconds: 1),(){
        _notes.clear();
        fecthNotes().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
      });}, child: ListView.builder(
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
                    title: Text(_notes[index].car_nombre),
                  ),
                ],
              ),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>  asignaturas(_notes[index].car_nombre), //pasa el nombre
                    ));
              },
            ),
          );
        },
        itemCount: _notes.length,
      ), ) 
    );
  }
}

class Note {
  String car_nombre;

  Note(this.car_nombre);

  Note.fromJson(Map<String, dynamic> json) {
    car_nombre = json['car_nombre'];
  }
}

