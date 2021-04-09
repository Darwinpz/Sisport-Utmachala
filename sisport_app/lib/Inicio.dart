import 'package:flutter/material.dart';

import 'drawer.dart' as slideBar;

class Inicio extends StatefulWidget {
  @override
  _InicioState createState() => _InicioState();
}

class _InicioState extends State<Inicio> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Inicio")),
      drawer: slideBar.MyDrawer(),
      body: SingleChildScrollView(
        child: Column(
        children: <Widget>[
          Padding(padding: const EdgeInsets.all(10)),
          Center(child: Text("MIS PORTAFOLIOS", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),)),
          Container(
            child: Column(
              children: <Widget>[
                Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  margin: EdgeInsets.all(15),
                  elevation: 10,
                  child: Column(
                    children: <Widget>[
                      ListTile(
                        contentPadding: EdgeInsets.fromLTRB(15, 10, 25, 0),
                        title: Text('ADMINISTRACIÓN DE CENTROS DE COMPUTO'),
                        subtitle: Text(
                            'ING. WILMER BRAULIO RIVAS ASANZA'),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[
                          FlatButton(
                              onPressed: () => {}, child: Text('Ver portafolio')),
                          // FlatButton(
                          //     onPressed: () => {}, child: Text('Cancelar'))
                        ],
                      )
                    ],
                  ),
                ),
                Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  margin: EdgeInsets.all(15),
                  elevation: 10,
                  child: Column(
                    children: <Widget>[
                      ListTile(
                        contentPadding: EdgeInsets.fromLTRB(15, 10, 25, 0),
                        title: Text('SISTEMAS OPERATIVOS II'),
                        subtitle: Text(
                            'ING. NANCY MAGALY LOJA MORA'),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[
                          FlatButton(
                              onPressed: () => {}, child: Text('Ver portafolio')),
                          // FlatButton(
                          //     onPressed: () => {}, child: Text('Cancelar'))
                        ],
                      )
                    ],
                  ),
                ),
                Card(
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  margin: EdgeInsets.all(15),
                  elevation: 10,
                  child: Column(
                    children: <Widget>[
                      ListTile(
                        contentPadding: EdgeInsets.fromLTRB(15, 10, 25, 0),
                        title: Text('EMPRENDIMIENTO'),
                        subtitle: Text(
                            'ING. FAUSTO REDROVAN'),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[
                          FlatButton(
                              onPressed: () => {}, child: Text('Ver portafolio')),
                          // FlatButton(
                          //     onPressed: () => {}, child: Text('Cancelar'))
                        ],
                      )
                    ],
                  ),
                )
              ],
            ),
          )
        ],
      ),
      )
    );
  }
}
