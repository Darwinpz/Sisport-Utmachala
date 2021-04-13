import 'package:flutter/material.dart';
import '../drawer.dart' as slideBar;
import 'diario.dart';

class tree extends StatefulWidget {

  final String recordName;
  const tree(this.recordName);

  @override
  treeState createState() => treeState();
}

class treeState extends State<tree> {
  @override
  Widget build(BuildContext context) {

      return Scaffold(
        appBar: AppBar(title: Text(widget.recordName)),
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
                    ListTile(
                      title: Text('DIARIO METACOGNITIVO 1'),
                      onTap: (){Navigator.push(context, MaterialPageRoute(builder: (context)=>Diario("DIARIO METACOGNITIVO 1")));},
                    )
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
