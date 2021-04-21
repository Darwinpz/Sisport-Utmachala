import 'package:flutter/material.dart';
import 'package:sisport_app/src/resources/expectativas.dart';
import 'package:sisport_app/src/resources/informefinal.dart';
import 'drawer.dart' as slideBar;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tree_view/tree_view.dart';
import 'dart:convert';
import 'diario.dart';

class tree extends StatefulWidget {
  final String asig_codigo;
  final String asig_nombre;
  final String peri_codigo;
  final String docente;
  final String per_codigo;
  final String per_nombre;
  final String per_apellido;
  const tree(this.asig_codigo, this.asig_nombre, this.peri_codigo, this.docente, this.per_codigo, this.per_nombre, this.per_apellido);

  @override
  treeState createState() => treeState();
}

class treeState extends State<tree> {
  String token = "";
  String codigo = "";
  String tipo="";

  var syllabus="";
  var asistencia="";

  List<Note> _notes = List<Note>();
  List<Note2> _notes2 = List<Note2>();
  List<Note2> _notes3 = List<Note2>();
  List<Note2> _notes4 = List<Note2>();
  List<Note2> _notes5 = List<Note2>();
  List<Note2> _notes6 = List<Note2>();
  List<Note2> _notes7 = List<Note2>();
  List<Note2> _notes8 = List<Note2>();
  List<Note2> _notes9 = List<Note2>();
  List<Note2> _notes10 = List<Note2>();
  List<Note2> _notes11 = List<Note2>();
  List<Note2> _notes12 = List<Note2>();


  Future<List<Note>> buscarPortafolio() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

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

  Future<List<Note2>> buscarevaluaciones() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes2 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['evaluaciones']) {
        notes2.add(Note2.fromJson(dato));
      }
    }
    return notes2;
  }

    Future<List<Note2>> buscarinvestigaciones() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes3 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['investigaciones']) {
        notes3.add(Note2.fromJson(dato));
      }
    }
    return notes3;
  }

    Future<List<Note2>> buscaractividades() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes4 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['actividades']) {
        notes4.add(Note2.fromJson(dato));
      }
    }
    return notes4;
  }

  Future<List<Note2>> buscarproyectos() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes5 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['proyectos']) {
        notes5.add(Note2.fromJson(dato));
      }
    }
    return notes5;
  }

  Future<List<Note2>> buscarestudios() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes6 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['casos_estudio']) {
        notes6.add(Note2.fromJson(dato));
      }
    }
    return notes6;
  }

  Future<List<Note2>> buscarplanteamientos() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes7 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['planteamientos']) {
        notes7.add(Note2.fromJson(dato));
      }
    }
    return notes7;
  }

  Future buscarasistencia() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});


    Map<String, dynamic> datos = json.decode(response.body);
    setState(() {
      asistencia=datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['asistencia']['nombre_archivo'].toString();
    });

  
  }

  Future<List<Note2>> buscarobservaciones() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes9 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['observaciones']) {
        notes9.add(Note2.fromJson(dato));
      }
    }
    return notes9;
  }

  Future<List<Note2>> buscarintraclases() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes10 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['intraclases']) {
        notes10.add(Note2.fromJson(dato));
      }
    }
    return notes10;
  }

  Future<List<Note2>> buscarautonomas() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes11 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['autonomos']) {
        notes11.add(Note2.fromJson(dato));
      }
    }
    return notes11;
  }

  Future<List<Note2>> buscarrefuerzo() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    var notes12 = List<Note2>();

    if (response.statusCode == 200) {
      Map<String, dynamic> datos = json.decode(response.body);
      for (var dato in datos['message'][0]['portafolio_data']
          ['elementos_curriculares']['refuerzo']) {
        notes12.add(Note2.fromJson(dato));
      }
    }
    return notes12;
  }

  Future buscarsyllabus() async {

    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
      tipo=preferences.getString('tipo');
    });

    Map data = {
      'asig_codigo': widget.asig_codigo,
      'peri_codigo': widget.peri_codigo,
      'per_codigo': tipo=="ESTUDIANTE"? codigo : widget.per_codigo 
    };

    http.Response response = await http.post(
        'http://190.155.140.58:80/api/portafolio/find',
        body: data,
        headers: {"Authorization": "bearer " + token});

    setState(() {
      Map<String, dynamic> datos = json.decode(response.body);
      syllabus=datos['message'][0]['estructura']['syllabus'].toString();
    });
  }

  @override
  void initState() {
    buscarPortafolio().then((value) {
      setState(() {
        _notes.addAll(value);
      });
    });
    buscarevaluaciones().then((value) {
      setState(() {
        _notes2.addAll(value);
      });
    });
    buscarinvestigaciones().then((value) {
      setState(() {
        _notes3.addAll(value);
      });
    });
    buscaractividades().then((value) {
      setState(() {
        _notes4.addAll(value);
      });
    });
    buscarproyectos().then((value) {
      setState(() {
        _notes5.addAll(value);
      });
    });
    buscarestudios().then((value) {
      setState(() {
        _notes6.addAll(value);
      });
    });
    buscarplanteamientos().then((value) {
      setState(() {
        _notes7.addAll(value);
      });
    });
    buscarasistencia();
    buscarobservaciones().then((value) {
      setState(() {
        _notes9.addAll(value);
      });
    });
    buscarintraclases().then((value) {
      setState(() {
        _notes10.addAll(value);
      });
    });
    buscarautonomas().then((value) {
      setState(() {
        _notes11.addAll(value);
      });
    });
    buscarrefuerzo().then((value) {
      setState(() {
        _notes12.addAll(value);
      });
    });
    buscarsyllabus();
    
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    // buscararchivos buscarArchivos= new buscararchivos();
    // buscarArchivos.buscar(token, codigo, tipo, widget.asig_codigo, widget.peri_codigo, widget.per_codigo, "carpeta");
    // debugPrint("esto devuelve: "+resultado.toString());

    return Scaffold(
        appBar: tipo=="ESTUDIANTE"? AppBar(title: Text(widget.asig_nombre, style: TextStyle(fontSize: 14),)):AppBar(title: Column(children: [
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
        body: SingleChildScrollView(
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
                ListTile(
                  title: Text(
                    'Biografia'
                  ),leading: Icon(Icons.menu_book_outlined),
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
                      title: Text(syllabus),
                       leading: Icon(Icons.menu_book_outlined),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'b) Expectativas',
                  ),
                  children: <Widget>[
                     ListTile(
                       title: Text("Expectativas"),
                       leading: Icon(Icons.menu_book_outlined),
                       onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context)=>expectativas(widget.asig_codigo, widget.peri_codigo, widget.per_codigo, widget.asig_nombre)));},
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
                      onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context)=>Diario("DIARIO METACOGNITIVO "+_notes[index].num_diario.toString(), _notes[index].num_diario.toString(), _notes[index].tiempo.toString(), _notes[index].fecha, tipo=="ESTUDIANTE"? codigo: widget.per_codigo, widget.asig_codigo, widget.asig_nombre, widget.peri_codigo)));},
                    );
                    },  itemCount: _notes.length,)                 
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'd) Evaluaciones',
                  ),
                  children: <Widget>[
                     ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes2[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes2.length,)

                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'e) Investigaciones',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes3[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes3.length,)

                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'f) Actividades de experimentación',
                  ),
                  children: <Widget>[
                     ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes4[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes4.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'g) Proyectos',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes5[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes5.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'h) Estudios de caso',
                  ),
                  children: <Widget>[
                     ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes6[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes6.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'i) Planteamiento de problemas',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes7[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes7.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'j) Registro de asistencia',
                  ),
                  children: <Widget>[
                    ListTile(
                      title:Text(asistencia),
                      leading: Icon(Icons.menu_book_outlined),
                    )
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'k) Registro de observaciones',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes9[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes9.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'l) Tareas intraclases',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes10[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes10.length,)
                    
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'm) Tareas autónomas',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes11[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes11.length,)
                  ],
                ),
                ExpansionTile(
                  title: Text(
                    'n) Tareas de refuerzo',
                  ),
                  children: <Widget>[
                    ListView.builder(physics: NeverScrollableScrollPhysics(), scrollDirection: Axis.vertical, shrinkWrap: true,itemBuilder: (context, index){
                      return ListTile(
                      title: Text(_notes12[index].nombre_archivo),
                      leading: Icon(Icons.menu_book_outlined),
                      onTap: (){},
                    );
                    },  itemCount: _notes12.length,)
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
                ListTile(
                  title: Text(
                    'Informe final',
                    
                  ),leading: Icon(Icons.menu_book_outlined),
                  onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context)=>informefinal(widget.asig_codigo, widget.peri_codigo, widget.per_codigo, widget.asig_nombre)));},
                )
              ],
            ),
            MaterialButton(
                      color: Colors.green,
                      onPressed: () {},
                      height: 50,
                      minWidth: 400,
                      shape: RoundedRectangleBorder(
                          borderRadius: new BorderRadius.circular(30.0)),
                      child: Text('Descargar portafolio',
                          style: TextStyle(color: Colors.white, fontSize: 17)),
                    ),
          ],
        ),
      ),
          ],),
        ),);
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

class Note2{
  String nombre_archivo;

  Note2(this.nombre_archivo);

  Note2.fromJson(Map<String, dynamic> json) {
     nombre_archivo=json['nombre_archivo'];
   }

}
