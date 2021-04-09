import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

import 'Inicio.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences preferences = await SharedPreferences.getInstance();
  var email = preferences.getString('email');
  runApp(MaterialApp(
    home: email == null ? Login() : Inicio(),
  ));
}

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passController = TextEditingController();

  Future checkLogin(String cedula, clave) async {
    Map data = {'per_cedula': cedula, 'per_clave': clave};

    http.Response response = await http
        .post('http://190.155.140.58:80/api/persona/login', body: data);

    Map<String, dynamic> datos = json.decode(response.body);

    debugPrint("Esto es el response body" + response.body);
    debugPrint("Este es el status" + (response.statusCode).toString());

    if (response.statusCode == 200) {
      var email = (datos["message"]["per_correo"]);
      var nombre = (datos["message"]["per_nombre"]);
      var apellido = (datos["message"]["per_apellido"]);
      SharedPreferences preferences = await SharedPreferences.getInstance();
      preferences.setString('email', email);
      preferences.setString('nombre', nombre);
      preferences.setString(('apellido'), apellido);

      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => Inicio(),
        ),
      );
    } else if (response.statusCode == 403) {
      debugPrint("no entra al 403");
      Fluttertoast.showToast(
          msg: "Cédula o contraseña inválidos.",
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
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Image(
              image: AssetImage('assets/images/logo.png'),
              width: 250,
              height: 250,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
                controller: emailController,
                decoration: InputDecoration(
                    labelText: 'Cédula',
                    filled: true,
                    fillColor: Colors.grey[200],
                    border: new OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25.7)))),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              obscureText: true,
              controller: passController,
              decoration: InputDecoration(
                  labelText: 'Contraseña',
                  filled: true,
                  fillColor: Colors.grey[200],
                  border: new OutlineInputBorder(
                      borderRadius: BorderRadius.circular(25.7))),
            ),
          ),
          SizedBox(
            height: 10,
          ),
          MaterialButton(
            color: Colors.blueAccent,
            onPressed: () {
              checkLogin(emailController.text, passController.text);
            },
            height: 50,
            minWidth: 350,
            shape: RoundedRectangleBorder(
                borderRadius: new BorderRadius.circular(30.0)),
            child: Text('Ingresar', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}
