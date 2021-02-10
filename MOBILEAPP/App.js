import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList,
} from 'react-native';

import styles from './style/todolist'
import { Input, Icon, Overlay, ListItem } from 'react-native-elements';



const App = () => {
  let [input, setInput] = React.useState()
  let [data, setData] = React.useState([
    "Ibadah",
    "Mandi",
    "Sarapan"
  ])
  const [idDel, setIdDel] = React.useState(null)
  const [idEdit, setIdEdit] = React.useState(null)
  const [confDel, setConfDel] = React.useState(false)
  const [confEdit, setConfEdit] = React.useState(false)
  const [inputEdit, setInputEdit] = React.useState("")


  const addHandle = () => {
    setData(prev => [...prev, input])
    setInput("")
  }

  const delHandle = () => {
    // console.log(idDel)
    let tempData = [...data]
    tempData.splice(idDel, 1)
    setData(tempData)
    setConfDel(false)
    setIdDel(null) //NOTE harus di reset kembali supaya tidak ada valuenya
  }

  const editHandle = () => {
    let tempData = [...data]
    tempData.splice(idEdit, 1, inputEdit)
    setData(tempData)
    setConfEdit(false)
    setIdEdit(null)
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TO DO LIST</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='INPUT WITH ICON'
          leftIcon={{ type: 'font-awesome', name: "angle-double-right" }}
          onChangeText={text => setInput(text)}
          value={input}
        />
        <Icon
          reverse
          name='plus'
          type='font-awesome'
          color='blue'
          onPress={() => addHandle()}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <ListItem containerStyle={styles.listItem} onPress={() => { setConfDel(true), setIdDel(index) }}
              onLongPress={() =>{ setConfEdit(true), setIdEdit(index)}}>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Overlay isVisible={confDel} onBackdropPress={() => setConfDel(false)} overlayStyle={styles.overlayDel} >
        <View style={styles.childOverlay}>
          <Text style={{ fontSize: 25 }}>Are you sure to delete?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Yes" color="green" onPress={delHandle} />
            <Button title="No" color="red" onPress={() => setConfDel(false)} />
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={confEdit} onBackdropPress={() => setConfEdit(false)} overlayStyle={styles.overlayEdit}>
        <View style={styles.childOverlay}>
          <Input
            placeholder='Input edit'
            onChangeText={text => setInputEdit(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Yes" color="green" onPress={editHandle} />
            <Button title="No" color="red" onPress={() => setConfEdit(false)} />
          </View>
        </View>
      </Overlay>
    </SafeAreaView>
  )
};


export default App;
