import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:sisport_app/main.dart';
import 'package:sisport_app/src/views/Inicio.dart';

class Cambioclave extends StatefulWidget {

  @override
  _CambioclaveState createState() => _CambioclaveState();
}

class _CambioclaveState extends State<Cambioclave> {
  String token = "";
  String codigo = "";

  Future<String> updatePassword(String clave) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      token = preferences.getString('token');
      codigo = preferences.getString('codigo');
    });

    Map datos = {'per_clave': clave, 'per_codigo': codigo};

    http.Response response = await http.post('http://190.155.140.58:80/api/persona/updatepassword', body: datos, headers: {"Authorization": "bearer " + token});

      if (response.statusCode == 200) {
        Fluttertoast.showToast(
            msg: "Contraseña actualizada. Inicie sesión con su nueva clave.",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIos: 1,
            backgroundColor: Colors.green,
            textColor: Colors.white,
            fontSize: 16.0);

        preferences.remove('token');
        preferences.remove('tipo');
        preferences.remove('codigo');
      
        Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => Login(),
            ),
        );
      }else if(response.statusCode==403){
        Fluttertoast.showToast(
            msg: "Error al actualizar contraseña",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIos: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
      }
  } 


  @override
  Widget build(BuildContext context) {
    TextEditingController contrasena = TextEditingController();
    return Scaffold(
      body: Center(child: Container(width: 350, child:Center(child: Column(crossAxisAlignment: CrossAxisAlignment.center, mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
        Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Text(
                  "Ingrese su nueva clave: ", 
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                  textAlign: TextAlign.left,
                ),
              ),
          Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: contrasena,
                  obscureText: true,
                    decoration: InputDecoration(
                        labelText: "Nueva clave",
                        filled: true,
                        enabled: true,
                        fillColor: Colors.grey[200],
                        border: new OutlineInputBorder(
                            borderRadius: BorderRadius.circular(25.7)))),
              ),
          MaterialButton(
              color: Colors.green,
              onPressed: () {
                updatePassword(contrasena.text);
              },
              height: 50,
              minWidth: 330,
              shape: RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(30.0)),
              child: Text('Cambiar clave',
                  style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
        
      ],)) ))  
        
      );
      
    
  }
  
}

