import 'package:flutter/material.dart';
import '../drawer.dart' as slideBar;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'diario.dart';

class treeAlumDocen extends StatefulWidget {

  final String asig_codigo;
  final String asig_nombre;
  final String peri_codigo;
  final String per_codigo;
  final String per_nombre;
  final String per_apellido;
  const treeAlumDocen(this.asig_codigo, this.asig_nombre, this.peri_codigo, this.per_codigo, this.per_nombre, this.per_apellido);

  @override
  treeAlumDocenState createState() => treeAlumDocenState();
}

class treeAlumDocenState extends State<treeAlumDocen> {

  String token="";
  String codigo="";

   List<Note> _notes = List<Note>();

  Future<List<Note>> buscarPortafolio()async{

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo=preferences.getString('codigo');
    });

    Map data = {'asig_codigo': widget.asig_codigo, 'peri_codigo': widget.peri_codigo, 'per_codigo':widget.per_codigo};

    debugPrint(widget.asig_codigo+" "+widget.peri_codigo+" "+widget.per_codigo);

    http.Response response = await http
        .post('http://190.155.140.58:80/api/portafolio/find', body: data, headers: {"Authorization":"bearer "+token});

    Map<String, dynamic> datos = json.decode(response.body);
    debugPrint(datos.toString());

    var notes = List<Note>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['apuntes']) {
        notes.add(Note.fromJson(dato));
      }
    }

    return notes;


  }

  @override
  void initState(){
    buscarPortafolio().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
   
    super.initState();
  }




  @override
  Widget build(BuildContext context) {

      return Scaffold(
        appBar: AppBar(title: Column(children: [
        Text(
          widget.asig_nombre, style: TextStyle(fontSize: 14),
        ),
        GestureDetector(
          child: Text('ESTUDIANTE: '+widget.per_nombre+" "+widget.per_apellido, style: TextStyle(fontSize: 12),),
          onTap: () {
            
          },
        )
      ])),
        drawer: slideBar.MyDrawer(),
        body:SingleChildScrollView(
          child: Stack(children: <Widget>[
                    Padding(
        padding: const EdgeInsets.symmetric(horizontal: 30.0),
        child: Column(
          children: <Widget>[
            SizedBox(height:20.0),
            ExpansionTile(
              title: Text(
                "1. Datos informativos",
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold
                ),
              ),
              children: <Widget>[
                ExpansionTile(
                  title: Text(
                    'Sub title',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ListTile(
                  title: Text(
                    'data'
                  ),
                )
              ],
            ),
            ExpansionTile(
              title: Text(
                "2. Elementos curriculares",
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold
                ),
              ),
              children: <Widget>[
                ExpansionTile(
                  title: Text(
                    'a) Syllabus',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'b) Expectativas',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'c) Apuntes de clase',
                  ),
                  children: <Widget>[
                      ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text('DIARIO METACOGNITIVO '+_notes[index].num_diario.toString()),
                      leading: Icon(Icons.book),
                      onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context)=>Diario("DIARIO METACOGNITIVO "+_notes[index].num_diario.toString(), _notes[index].num_diario.toString(), _notes[index].tiempo.toString(), _notes[index].fecha, widget.per_codigo, widget.asig_codigo, widget.asig_nombre, widget.peri_codigo)));},
                    );
                    },  itemCount: _notes.length,)

                    
                    
                    
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'd) Evaluaciones',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'e) Investigaciones',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'f) Actividades de experimentación',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'g) Proyectos',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'h) Estudios de caso',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'i) Planteamiento de problemas',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'j) Registro de asistencia',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'k) Registro de observaciones',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'l) Tareas intraclases',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'm) Tareas autónomas',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'n) Tareas de refuerzo',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
              ],
            ),
            ExpansionTile(
              title: Text(
                "3. Informe final",
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold
                ),
              ),
              children: <Widget>[
                ExpansionTile(
                  title: Text(
                    'Sub title',
                  ),
                  children: <Widget>[
                    ListTile(
                      title: Text('data'),
                    )
                  ],
                ),
                ListTile(
                  title: Text(
                    'data'
                  ),
                )
              ],
            ),
          ],
        ),
      ),
          ],),
        ),

      );
  }
}

class Note {
  int num_diario;
  String tiempo;
  String fecha;
  String unidad;
  String tema;
  String problema;
  String contenidos;
  String objetivos;
  String actividades;
  String estrategias;
  String resumen;
  String reflexion;
  String anexos;

  Note(
      this.num_diario,
      this.tiempo,
      this.fecha,
      this.unidad,
      this.tema,
      this.problema,
      this.contenidos,
      this.objetivos,
      this.actividades,
      this.estrategias,
      this.resumen,
      this.reflexion,
      this.anexos);

  Note.fromJson(Map<String, dynamic> json) {
    num_diario = json['num_diario'];
    tiempo = json['tiempo'];
    fecha = json['fecha'];
    unidad = json['unidad'];
    tema = json['tema'];
    problema = json['problema'];
    contenidos = json['contenidos'];
    objetivos = json['objetivos'];
    actividades = json['actividades'];
    estrategias = json['estrategias'];
    resumen = json['resumen'];
    reflexion = json['reflexion'];
    anexos = json['anexos'];
  }
}
