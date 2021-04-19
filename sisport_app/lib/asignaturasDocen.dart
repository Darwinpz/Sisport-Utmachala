import 'package:flutter/material.dart';
import 'drawer.dart' as slideBar;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import './Estructura/tree.dart';
import './Estructura/treeDocen.dart';
import 'Inicio.dart';


class asignaturasDocen extends StatefulWidget {


  @override
  asignaturasDocenState createState() => asignaturasDocenState();
}

class asignaturasDocenState extends State<asignaturasDocen> {

   String token="";
   String tipo="";

  List<Note> _notes = List<Note>();

  Future<List<Note>> fecthNotes() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      tipo=preferences.getString('tipo');
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

      Fluttertoast.showToast(
          msg: "Escoga su asignatura",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 16.0);
      
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
  
  TextEditingController _textFieldController = TextEditingController();
   String codeDialog;
  String valueText;
  Future<void> _displayTextInputDialog(BuildContext context, index, int asig_codigo, int peri_codigo, String asig_nombre, String clave) async {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text(asig_nombre+'\n'+'Asigne clave de acceso:'),
            content: TextField(
              obscureText: true,
              onChanged: (value) {
                setState(() {
                  valueText = value;
                });
              },
              controller: _textFieldController,
              decoration: InputDecoration(hintText: "Clave"),
            ),
            actions: <Widget>[
              FlatButton(
                color: Colors.red,
                textColor: Colors.white,
                child: Text('Cancelar'),
                onPressed: () {
                  _textFieldController.clear();
                  setState(() {
                    Navigator.pop(context);
                  });
                },
              ),
              FlatButton(
                color: Colors.green,
                textColor: Colors.white,
                child: Text('Ingresar'),
                onPressed: () {
                  setState(() {
                    _textFieldController.clear();
                    asignarClave('fic.is.esqs', asig_codigo, peri_codigo, asig_nombre, _textFieldController.toString());
                    codeDialog = valueText;
                    Navigator.push(context, MaterialPageRoute(builder: (context) => Inicio()));
                    
                  });
                },
              ),
            ],
          );
        });
  }

  Future asignarClave(String nombre_esquema, int asig_codigo, int peri_codigo, String asig_nombre, String clave)async{

    Map data = {'nombre_esquema':nombre_esquema,'asig_codigo': asig_codigo.toString(), 'peri_codigo': peri_codigo.toString(), 'asig_nombre':asig_nombre, 'clave':clave};

    http.Response response = await http
        .post('http://190.155.140.58:80/api/estructura/add', body: data, headers: {"Authorization":"bearer "+token});


    if(response.statusCode==200){
      Fluttertoast.showToast(
          msg: "Asignación de clave exitosa",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 16.0);
    }


  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:  ListView.builder(
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
                    subtitle: Text(_notes[index].sem_nombre+" "+_notes[index].sem_paralelo+"\n"+_notes[index].docente),
                  ),
                  Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[

                          _notes[index].asig_est_estado?FlatButton(
                                  onPressed: () => { Navigator.push(context, MaterialPageRoute(builder: (context)=>treeDocen(_notes[index].asig_nombre, (_notes[index].asig_codigo).toString(), (_notes[index].peri_codigo).toString())))},   
                                  child: Text('Ver portafolios')): FlatButton(
                                  onPressed: () => { _textFieldController.clear(), _displayTextInputDialog(context, index, _notes[index].asig_codigo, _notes[index].peri_codigo, _notes[index].asig_nombre, "")},   
                                  child: Text('Asignar clave'))

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
  String sem_nombre;
  String sem_paralelo;
  int asig_codigo;
  String docente;
  int peri_codigo;
  bool asig_est_estado;

  Note(this.asig_nombre, this.sem_nombre, this.sem_paralelo, this.asig_codigo,
      this.docente, this.peri_codigo, this.asig_est_estado);

  Note.fromJson(Map<String, dynamic> json) {
    asig_nombre = json['asig_nombre'];
    sem_nombre = json['sem_nombre'];
    sem_paralelo = json['sem_paralelo'];
    asig_codigo = json['asig_codigo'];
    docente = json['docente'];
    peri_codigo = json['peri_codigo'];
    asig_est_estado=json['asig_est_estado'];
  }
}
