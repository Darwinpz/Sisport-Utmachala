import 'package:flutter/material.dart';

class RecordsScreen extends StatefulWidget {
  List<RecordObject> records;
  RecordsScreen({Key key, @required this.records}) : super(key: key);
  @override
  _RecordsScreenState createState() => _RecordsScreenState();
}

class _RecordsScreenState extends State<RecordsScreen> {
  
  @override
  Widget build(BuildContext context) {
    widget.records = List<RecordObject>.generate(20,
          (i) => RecordObject(
        'Record $i',
        'A description of what needs to be done for Record $i',
      ),
    );
    return Scaffold(
      appBar: AppBar(
        title: Text('Records'),
      ),
      body: ListView.builder(
        itemCount:  widget.records.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text( widget.records[index].title),
            // When a user taps the ListTile, navigate to the DetailScreen.
            // Notice that you're not only creating a DetailScreen, you're
            // also passing the current todo through to it.
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => DetailScreen(recordObject:  widget.records[index]),
                ),
              );
            },
          );
        },
      ),
    );
  }