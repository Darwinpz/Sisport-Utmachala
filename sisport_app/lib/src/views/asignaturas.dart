import 'package:flutter/material.dart';
import '../resources/drawer.dart' as slideBar;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import '../resources/tree.dart';
import 'Inicio.dart';


class asignaturas extends StatefulWidget {
  final String car_nombre;
  const asignaturas(this.car_nombre);

  @override
  asignaturasState createState() => asignaturasState();
}

class asignaturasState extends State<asignaturas> {

   String token="";
   String tipo="";
   String codigo="";
   String per_cedula="";

  List<Note> _notes = List<Note>();

  Future<List<Note>> asignaturas() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      tipo=preferences.getString('tipo');
      codigo=preferences.getString('codigo');
      per_cedula=preferences.getString('per_cedula');
    });

    Map data = {'car_nombre': widget.car_nombre};
    
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
      
    }
    return notes;
  }

  @override
  void initState(){
    asignaturas().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
    super.initState();
  }
  
  TextEditingController _textFieldController = TextEditingController();
   String codeDialog;
  String valueText;
  Future<void> _displayTextInputDialog(BuildContext context, index, int asig_codigo, int peri_codigo, String asig_nombre, String fac_abreviatura, String asig_identificador, int sem_codigo, String car_abreviatura) async {
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
                    matricularse(asig_codigo, peri_codigo, _textFieldController.text, fac_abreviatura, asig_identificador, sem_codigo, car_abreviatura);
                    _textFieldController.clear();
                    codeDialog = valueText;
                  });
                },
              ),
            ],
          );
        });
  }

  Future matricularse(int asig_codigo, int peri_codigo, String clave, String fac_abreviatura, String asig_identificador, int sem_codigo, String car_abreviatura)async{

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      per_cedula=preferences.getString('per_cedula');
    });

    Map data = {'asig_codigo': asig_codigo.toString(), 'peri_codigo': peri_codigo.toString(), 'clave':clave};

    http.Response response = await http
        .post('http://190.155.140.58:80/api/portafolio/add', body: data, headers: {"Authorization":"bearer "+token});

    String abrevitura_completa=(asig_identificador+"-"+peri_codigo.toString()+"-"+sem_codigo.toString());

    Map<String, dynamic> data2 ={'fac_nombre':fac_abreviatura, 'car_nombre':car_abreviatura, 'asig_identificador': abrevitura_completa, 'per_cedula': per_cedula};

     http.Response response2 = await http
        .post('http://190.155.140.58:4555/create/portafolio', body: json.encode(data2), headers: { 'Content-type': 'application/json',
      'Accept': 'application/json',"Authorization":"bearer "+token});


    if(response.statusCode==200 && response2.statusCode==200){
      Fluttertoast.showToast(
          msg: "Matriculación exitosa",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 16.0);
      Navigator.push(context, MaterialPageRoute(builder: (context) => Inicio()));

    }else{
      Fluttertoast.showToast(
          msg: "Clave incorrecta",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Matriculación")),
      drawer: slideBar.MyDrawer(),
      body: RefreshIndicator(onRefresh: (){return Future.delayed(Duration(seconds: 1),(){
        _notes.clear();
        asignaturas().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
      });}, child: _notes.length==0? Center(child: Text("Ninguna asignatura registrada para esta carrera.", style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic))): ListView.builder(
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
                                  onPressed: () => { _textFieldController.clear(), _displayTextInputDialog(context, index, _notes[index].asig_codigo, _notes[index].peri_codigo, _notes[index].asig_nombre, _notes[index].fac_abreviatura, _notes[index].asig_identificador, _notes[index].sem_codigo, _notes[index].car_abreviatura)},   
                                  child: Text('Matricularse', style: TextStyle(color: Colors.green),)) : FlatButton(
                                  onPressed: () => { Navigator.push(context, MaterialPageRoute(builder: (context)=>tree(_notes[index].asig_codigo.toString(), _notes[index].asig_nombre, _notes[index].peri_codigo.toString(), _notes[index].docente, "", "", "", _notes[index].sem_codigo.toString(), widget.car_nombre)))},   
                                  child: Text('Ver portafolio', style: TextStyle(color: Colors.blueAccent),)) :FlatButton(
                                  onPressed: () => { },   
                                  child: Text('Asignatura no activada', style: TextStyle(color: Colors.red),))

                        ],
                      )
                ],
              ),
              
            ),
          );
        },
        itemCount: _notes.length,
      ),) 
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
  int sem_codigo;
  String fac_abreviatura;
  String asig_identificador;
  String car_abreviatura;

  Note(this.asig_nombre, this.asig_codigo, this.sem_nombre, this.sem_paralelo, this.peri_codigo, this.docente, this.estado, this.matriculado, this.sem_codigo, this.fac_abreviatura, this.asig_identificador, this.car_abreviatura);

  Note.fromJson(Map<String, dynamic> json) {
    asig_nombre = json['asig_nombre'];
    asig_codigo = json['asig_codigo'];
    sem_nombre = json['sem_nombre'];
    sem_paralelo = json['sem_paralelo'];
    peri_codigo = json['peri_codigo'];
    docente = json['docente'];
    estado=json['estado'];
    matriculado = json['matriculado'];
    sem_codigo=json['sem_codigo'];
    fac_abreviatura=json['fac_abreviatura'];
    asig_identificador=json['asig_identificador'];
    car_abreviatura=json['car_abreviatura'];
  }
}