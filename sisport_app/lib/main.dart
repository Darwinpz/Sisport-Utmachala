import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:http/http.dart' as http;
import 'package:sisport_app/src/views/cambioclave.dart';
import 'dart:async';
import 'dart:convert';

import 'src/views/Inicio.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  await FlutterDownloader.initialize(
      debug: true // optional: set false to disable printing logs to console
      );
  SharedPreferences preferences = await SharedPreferences.getInstance();
  var token = preferences.getString('token');
  runApp(MaterialApp(
    home: token == null ? Login() : Inicio(),
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

    if (response.statusCode == 200) {
      var token = (datos["token"]);

      SharedPreferences preferences = await SharedPreferences.getInstance();
      preferences.setString('token', token);

      Map<String, String> headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
      };

      var response = await http
          .get('http://190.155.140.58:80/api/persona/perfil', headers: headers);

      Map<String, dynamic> extractdata = json.decode(response.body);

      var nombre = extractdata["message"]["per_nombre"].toString();
      var apellido = extractdata["message"]["per_apellido"].toString();
      var correo = extractdata["message"]["per_correo"].toString();
      var tipo = extractdata["message"]["per_tipo"].toString();
      var codigo = extractdata["message"]["per_codigo"].toString();
      var per_cedula = extractdata["message"]["per_cedula"].toString();

      preferences.setString('apellido', apellido);
      preferences.setString('nombre', nombre);
      preferences.setString('correo', correo);
      preferences.setString('tipo', tipo);
      preferences.setString('codigo', codigo);
      preferences.setString('per_cedula', per_cedula);

      if (cedula == clave) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => Cambioclave(),
          ),
        );
      }else{
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => Inicio(),
          ),
        );
      }
    }else if (response.statusCode == 403) {
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
        body: Center(
            child: Container(
      width: 350,
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  "SISTEMA DE GESTIÓN DE PORTAFOLIOS",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      fontSize: 20,
                      color: Colors.blueAccent,
                      fontWeight: FontWeight.bold),
                )),
            Padding(
              padding: const EdgeInsets.all(10.0),
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
              minWidth: 330,
              shape: RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(30.0)),
              child: Text('Ingresar',
                  style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
          ],
        ),
      ),
    )));
  }
}

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  // If you're going to use other Firebase services in the background, such as Firestore,
  // make sure you call `initializeApp` before using other Firebase services.
  await Firebase.initializeApp();

  print("Handling a background message: ${message.messageId}");
}
