import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sisport_app/main.dart';
import 'Matriculacion.dart';
import 'Inicio.dart';

class MyDrawer extends StatefulWidget {
  @override
  _MyDrawerState createState() => _MyDrawerState();
}

class _MyDrawerState extends State<MyDrawer> {
  String token = "";
  String nombre = "";
  String apellido = "";
  String correo = "";
  String tipo = "";
  String codigo = "";

  Future<String> makeRequest() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      nombre = preferences.getString('nombre');
      apellido = preferences.getString('apellido');
      correo = preferences.getString('correo');
      tipo = preferences.getString('tipo');
      codigo = preferences.getString('codigo');
    });
  }

  @override
  void initState() {
    makeRequest();
    super.initState();
  }

  Future logOut(BuildContext context) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.remove('token');
    preferences.remove('tipo');
    preferences.remove('codigo');
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => Login(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return 
    
    
    
    
    Drawer(
      // Add a ListView to the drawer. This ensures the user can scroll
      // through the options in the drawer if there isn't enough vertical
      // space to fit everything.
      child: ListView(
        // Important: Remove any padding from the ListView.
        padding: EdgeInsets.zero,
        children: <Widget>[
          Container(
            height: 250.0,
            child: DrawerHeader(
                decoration: BoxDecoration(
                  color: Colors.blue,
                ),
                child: Column(
                  children: <Widget>[
                    ListTile(
                      title: Text(
                        tipo + ":",
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    ListTile(
                      title: Text(nombre + " " + apellido,
                          style: TextStyle(color: Colors.white)),
                      leading: Icon(Icons.person),
                    ),
                    ListTile(
                      title:
                          Text(correo, style: TextStyle(color: Colors.white)),
                      leading: Icon(Icons.email),
                    ),
                  ],
                )),
          ),
          ListTile(
            leading: Icon(
              Icons.home_outlined,
              color: Colors.black,
              size: 30,
            ),
            title: Text('Mis portafolios'),
            onTap: () {
              // Update the state of the app
              // ...
              // Then close the drawer
              Navigator.push(
                  context, MaterialPageRoute(builder: (context) => Inicio()));
            },
          ),
          ListTile(
            leading: Icon(
              Icons.library_add_outlined,
              color: Colors.black,
              size: 30,
            ),
            title: Text('Matricularse'),
            onTap: () {
              // Update the state of the app
              // ...
              // Then close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => Matriculacion()));
            },
          ),
          ListTile(
            title: Text('Cerrar sesión'),
            leading: Icon(
              Icons.logout,
              color: Colors.black,
              size: 30,
            ),
            onTap: () {
              // Update the state of the app
              // ...
              // Then close the drawer
              logOut(context);
              Navigator.pop(context);
            },
          ),
        ],
      ),
    );
  }
}
