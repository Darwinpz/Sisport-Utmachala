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

  String email = "";
  String nombre="";
  String apellido="";
  String codigo="";

  Future getDatosPer()async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      email = preferences.getString('email');
      nombre=preferences.getString('nombre');
      apellido=preferences.getString('apellido');
      codigo=preferences.getString('codigo');

    });
  }

  Future logOut(BuildContext context)async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.remove('email');
    preferences.remove('nombre');
    preferences.remove('apellido');
    preferences.remove('codigo');
    Navigator.push(context, MaterialPageRoute(builder: (context)=>Login(),),);
  }


  @override
  void initState() {
    super.initState();
    getDatosPer();
  }

  @override
  Widget build(BuildContext context) {
    return  Drawer(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: <Widget>[
            Container(
              height: 140.0,
              child: DrawerHeader( child: Column(
              children: <Widget>[
                Container(
                  child: Row(mainAxisAlignment: MainAxisAlignment.start,
                  children:<Widget> [ 
                    Expanded(flex: 2,child: Container(decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: Colors.grey[200])),
                      child: Column(children: [Icon(Icons.person, color: Colors.grey[200], size: 50)]))),
                    Expanded(flex: 5, child: Container(child: Column(children: <Widget>[
                      Container(child: nombre == '' ? Text('') : Text(nombre + " "+apellido, style: TextStyle(color: Colors.white))),
                      Padding(padding: const EdgeInsets.all(4)),
                      Container(child: email == '' ? Text('') : Text(email, style: TextStyle(color: Colors.white, fontSize: 11)))
                    ])))
                  ],)
                )
              ],
            ),
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
            ),
            ),
            ListTile(
              leading: Icon(Icons.home_outlined, color: Colors.black, size: 30,),
              title: Text('Inicio'),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.push(context, MaterialPageRoute(builder: (context)=>Inicio()));

              },
            ),
            ListTile(
              leading: Icon(Icons.library_add_outlined, color: Colors.black, size: 30,),
              title: Text('Matricularse'),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.push(context, MaterialPageRoute(builder: (context)=>Matriculacion()));

              },
            ),
            ListTile(
              title: Text('Cerrar sesión'),
              leading: Icon(Icons.logout, color: Colors.black, size: 30,),
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