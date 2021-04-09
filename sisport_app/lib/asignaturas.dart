import 'package:flutter/material.dart';
import 'drawer.dart' as slideBar;
import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;

// class Semestres extends StatelessWidget {
  
//   final Note note;

//   // In the constructor, require a Note.
//   Semestres({Key key, @required this.note}) : super(key: key);


//   @override
//   Widget build(BuildContext context) {

//     String carNombre=note.car_nombre;
//     return Scaffold(
//       appBar: AppBar(title: Text("Matriculación")),
//       drawer: slideBar.MyDrawer(),
//       body: Text(carNombre)
        
//       );
      
    
//   }
// }
// 
// 


class MyRecord extends StatefulWidget {
  final String recordName;
  const MyRecord(this.recordName);

  @override
  MyRecordState createState() => MyRecordState();
}

class MyRecordState extends State<MyRecord> {

  List<Note> _notes = List<Note>();

  Future<List<Note>> fecthNotes() async {

    Map data = {'car_nombre': widget.recordName};
    var url = 'http://190.155.140.58:80/api/asignatura/buscar';
    var response = await http.post(url, body: data);

    var notes = List<Note>();

    if (response.statusCode == 200) {
      var notesJson = json.decode(response.body);
      for (var noteJson in notesJson["message"]) {
        notes.add(Note.fromJson(noteJson));
      }

      Fluttertoast.showToast(
          msg: "Escoga su asignatura",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
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
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Matriculación")),
      drawer: slideBar.MyDrawer(),
      body: ListView.builder(
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
                    title: Text(_notes[index].asig_nombre),
                  ),
                  Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[
                          FlatButton(
                              onPressed: () => {}, child: Text('Matricularse')),
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
      ),
    );
  }
}

class Note {
  String asig_nombre;

  Note(this.asig_nombre);

  Note.fromJson(Map<String, dynamic> json) {
    asig_nombre = json['asig_nombre'];
  }
}