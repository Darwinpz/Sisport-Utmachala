import 'package:flutter/material.dart';
import 'package:sisport_app/src/views/matriculados.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'Inicio.dart';


class asignaturasdocente extends StatefulWidget {


  @override
  asignaturasdocenteState createState() => asignaturasdocenteState();
}

class asignaturasdocenteState extends State<asignaturasdocente> {

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
  
  TextEditingController clavecontroller = TextEditingController();
    TextEditingController diacontroller = TextEditingController();
      TextEditingController horacontroller = TextEditingController();
          TextEditingController dia2controller = TextEditingController();
      TextEditingController hora2controller = TextEditingController();
          TextEditingController dia3controller = TextEditingController();
      TextEditingController hora3controller = TextEditingController();
   String codeDialog;
  String valueText;
  Future<void> _displayTextInputDialog(BuildContext context, index, int asig_codigo, int peri_codigo, String asig_nombre, String clave) async {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text(asig_nombre+'\n'+'Asigne clave de acceso:'),
            content:  SingleChildScrollView(child: Column(children: <Widget>[
              TextField(
              obscureText: true,
              onChanged: (value) {
                setState(() {
                  valueText = value;
                });
              },
              controller: clavecontroller,
              decoration: InputDecoration(hintText: "Clave"),
            ), TextField(
              obscureText: false,
              
              onChanged: (value) {
                setState(() {
                  valueText = value;
                  
                
                });
              },
              controller: diacontroller,
              decoration: InputDecoration(hintText: "Ingrese día de clases", helperText: "Ejm:Día 1, Día 2, Día 4..."),
            ),TextField(
              obscureText: false,
              onChanged: (value) {
                setState(() {
                  valueText = value;
                });
              },
              controller: horacontroller,
              decoration: InputDecoration(hintText: "Ingrese rango de hora", helperText: "Ejm: 07:30-8:30"),
            ),TextField(
              obscureText: false,
              
              onChanged: (value) {
                setState(() {
                  valueText = value;
                  
                
                });
              },
              controller: dia2controller,
              decoration: InputDecoration(hintText: "Ingrese día de clases", helperText: "Ejm:Día 1, Día 2, Día 4..."),
            ),TextField(
              obscureText: false,
              onChanged: (value) {
                setState(() {
                  valueText = value;
                });
              },
              controller: hora2controller,
              decoration: InputDecoration(hintText: "Ingrese rango de hora", helperText: "Ejm: 07:30-8:30"),
            ),
            TextField(
              obscureText: false,
              onChanged: (value) {
                setState(() {
                  valueText = value;
                });
              },
              controller: dia3controller,
              decoration: InputDecoration(hintText: "Ingrese día de clases", helperText: "Ejm:Día 1, Día 2, Día 4..."),
            ),TextField(
              obscureText: false,
              onChanged: (value) {
                setState(() {
                  valueText = value;
                });
              },
              controller: hora3controller,
              decoration: InputDecoration(hintText: "Ingrese rango de hora", helperText: "Ejm: 07:30-8:30"),
            )
              
            ],)),
            actions: <Widget>[
              FlatButton(
                color: Colors.red,
                textColor: Colors.white,
                child: Text('Cancelar'),
                onPressed: () {
                  clavecontroller.clear();
                  diacontroller.clear();
                  horacontroller.clear();
                  dia2controller.clear();
                  hora2controller.clear();
                  dia3controller.clear();
                  hora3controller.clear();
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
                    var diasdesemana=['Día 1','Día 2','Día 3','Día 4', 'Día 5'];
                    var horario=[];
                    var horas1=horacontroller.text.split("-");
                    var horas2=hora2controller.text.split("-");
                    var horas3=hora3controller.text.split("-");

                    var horaInicio=horas1[0].trim();
                    var horaFin=horas1.sublist(1).join(':').trim();
                    DateTime fecha1 =  DateTime.parse('1969-07-20 '+horaInicio);
                    DateTime fecha2 =  DateTime.parse('1969-07-20 '+horaFin);
                    DateTime cantHoras= fecha2.subtract(new Duration(hours: fecha1.hour, minutes: fecha1.minute));

                    horario.add({"num_dia":diasdesemana.indexOf(diacontroller.text)+1,"inicio":horaInicio,"fin":horaFin, "cant_horas":cantHoras.hour});
                   
                    if(hora2controller.text!=""){
                      var horaInicio=horas2[0].trim();
                      var horaFin=horas2.sublist(1).join(':').trim();
                      DateTime fecha1 =  DateTime.parse('1969-07-20 '+horaInicio);
                      DateTime fecha2 =  DateTime.parse('1969-07-20 '+horaFin);
                      DateTime cantHoras= fecha2.subtract(new Duration(hours: fecha1.hour, minutes: fecha1.minute));
                      horario.add({'num_dia':diasdesemana.indexOf(dia2controller.text)+1,'inicio':horaInicio,'fin':horaFin, 'cant_horas':cantHoras.hour});
                    }else if(hora3controller.text!=""){
                      var horaInicio=horas3[0].trim();
                      var horaFin=horas3.sublist(1).join(':').trim();
                      DateTime fecha1 =  DateTime.parse('1969-07-20 '+horaInicio);
                      DateTime fecha2 =  DateTime.parse('1969-07-20 '+horaFin);
                      DateTime cantHoras= fecha2.subtract(new Duration(hours: fecha1.hour, minutes: fecha1.minute));
                      horario.add({"num_dia":diasdesemana.indexOf(dia3controller.text)+1,"inicio":horaInicio,"fin":horaFin, "cant_horas":cantHoras.hour});
                    }
                    
                    clavecontroller.clear();
                    asignarClave(horario, asig_codigo, peri_codigo, clavecontroller.text);
                    codeDialog = valueText;
                    Navigator.push(context, MaterialPageRoute(builder: (context) => Inicio()));
                    
                  });
                },
              ),
            ],
          );
        });
  }

  Future asignarClave(var horario, int asig_codigo, int peri_codigo, String clave)async{

    Map<String, dynamic> data = {'arreglo': horario, 'asig_codigo': asig_codigo.toString(), 'peri_codigo': peri_codigo.toString()};

        http.Response response = await http
        .post('http://190.155.140.58:80/api/horario/add', body: json.encode(data), headers: { 'Content-type': 'application/json',
      'Accept': 'application/json',"Authorization":"bearer "+token});

    Map data2 = {'asig_codigo': asig_codigo.toString(), 'peri_codigo': peri_codigo.toString(), 'clave':clave};
    
    http.Response response2 = await http.post('http://190.155.140.58:80/api/estructura/add',body:data2,headers: {"Authorization":"bearer "+token});


    if(response.statusCode==200 && response2.statusCode==200){
      Fluttertoast.showToast(
          msg: "Asignación de clave exitosa",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 16.0);
    }else{
       Fluttertoast.showToast(
          msg: "Error en asignación de clave",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          backgroundColor: Colors.red,
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
                                  onPressed: () => { Navigator.push(context, MaterialPageRoute(builder: (context)=>matriculados(_notes[index].asig_nombre, (_notes[index].asig_codigo).toString(), (_notes[index].peri_codigo).toString())))},   
                                  child: Text('Ver portafolios')): FlatButton(
                                  onPressed: () => { clavecontroller.clear(), _displayTextInputDialog(context, index, _notes[index].asig_codigo, _notes[index].peri_codigo, _notes[index].asig_nombre, "")},   
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
