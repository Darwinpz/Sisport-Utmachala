import 'package:flutter/material.dart';
import 'drawer.dart' as slideBar;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import './Estructura/tree.dart';
import './Estructura/treeDocen.dart';
import 'Inicio.dart';


class MyRecord extends StatefulWidget {
  final String recordName;
  const MyRecord(this.recordName);

  @override
  MyRecordState createState() => MyRecordState();
}

class MyRecordState extends State<MyRecord> {

   String token="";
   String tipo="";

  List<Note> _notes = List<Note>();

  Future<List<Note>> fecthNotes() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      tipo=preferences.getString('tipo');
    });

    Map data = {'car_nombre': widget.recordName};
    
    var url = 'http://190.155.140.58:80/api/asignatura/buscar';
    var response = await http.post(url, body: data, headers: {"Authorization":"bearer "+token});

    var notes = List<Note>();

    if (response.statusCode == 200) {
      Map<String, dynamic> notesJson = json.decode(response.body);
      for (var noteJson in notesJson["message"]) {
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
      
      debugPrint("aber: "+notesJson.toString());
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
  Future<void> _displayTextInputDialog(BuildContext context, index, int asig_codigo, int peri_codigo, String asig_nombre) async {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: tipo=="ESTUDIANTE"?Text(asig_nombre+'\n'+'Ingrese clave de acceso:'):Text(asig_nombre+'\n'+'Asigne clave de acceso:'),
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
                    matricularse(asig_codigo, peri_codigo);
                    codeDialog = valueText;
                    Navigator.push(context, MaterialPageRoute(builder: (context) => Inicio()));
                    
                  });
                },
              ),
            ],
          );
        });
  }

  Future matricularse(int asig_codigo, int peri_codigo)async{

    Map data = {'asig_codigo': asig_codigo.toString(), 'peri_codigo': peri_codigo.toString()};

    http.Response response = await http
        .post('http://190.155.140.58:80/api/persona_asignatura/add', body: data, headers: {"Authorization":"bearer "+token});

    Map<String, dynamic> datos = json.decode(response.body);

    debugPrint("aber2: "+datos.toString());

    if(response.statusCode==200){
      Fluttertoast.showToast(
          msg: "Matriculación exitosa",
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
      appBar: tipo=="ESTUDIANTE"? AppBar(title: Text("Matriculación")):AppBar(title: Text("Asignación de claves")),
      drawer: slideBar.MyDrawer(),
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

                          _notes[index].estado?_notes[index].matriculado==false ? FlatButton(
                                  onPressed: () => { _textFieldController.clear(), _displayTextInputDialog(context, index, _notes[index].asig_codigo, _notes[index].peri_codigo, _notes[index].asig_nombre)},   
                                  child: Text('Matricularse')) : FlatButton(
                                  onPressed: () => { Navigator.push(context, MaterialPageRoute(builder: (context)=>tree(_notes[index].asig_nombre)))},   
                                  child: Text('Ver portafolio')) :FlatButton(
                                  onPressed: () => { },   
                                  child: Text('Asignatura no activada'))

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
  int asig_codigo;
  String sem_nombre;
  String sem_paralelo;
  int peri_codigo;
  String docente;
  bool estado;
  bool matriculado;

  Note(this.asig_nombre, this.asig_codigo, this.sem_nombre, this.sem_paralelo, this.peri_codigo, this.docente, this.estado, this.matriculado);

  Note.fromJson(Map<String, dynamic> json) {
    asig_nombre = json['asig_nombre'];
    asig_codigo = json['asig_codigo'];
    sem_nombre = json['sem_nombre'];
    sem_paralelo = json['sem_paralelo'];
    peri_codigo = json['peri_codigo'];
    docente = json['docente'];
    estado=json['estado'];
    matriculado = json['matriculado'];
  }
}