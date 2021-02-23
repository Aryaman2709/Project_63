import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import { Header } from 'react-native-elements';

  export default class HomeScreen extends React.Component{
      constructor(){
          super();
          this.state ={
              text: '',
              isSearchPressed: false,
              word: "",
              lexicalCategory :'',
              examples: [],
              defination :""
          }
      }

      getWord=(word)=>{
          var searchKeyword = word.toLowerCase().trim()
          var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
          return fetch(url)
          .then((data)=>{
              if(data.status===200){
                  return data.json()
              }
              else
              {
                  return null
              }
          })
          .then((response)=>{
              var responseObject = response

              if(responseObject){
                  var wordData = responseObject.definitions[0]
                  var definition = wordData.description
                  var lexicalCategory=wordData.wordtype

                  this.setState({
                     word:this.state.text,
                      defination: definition,
                      lexicalCategory: lexicalCategory
                  })
              }
              else
              {
                  this.setState({
                      word: this.state.text,
                      lexicalCategory: "Not Found",
                      defination: "Not Found"
                  })
              }
          })
      }

      render(){
          return(
              <View style = {styles.container}>
                   <Header
                      backgroundColor={'violet'}
                      centerComponent={{
                      text: 'Pocket Dictionary',
                      style: { color: '#fff', fontSize: 20 },
                      }}
                     />
                     <TextInput
                     style = {styles.inputBox}
                     onChangeText={text=>{
                         this.setState({
                             text:text,
                             isSearchPressed:false,
                             word: "",
                             lexicalCategory: '',
                             examples : [],
                             defination : ""
                         });
                     }}
                     value={this.state.text}
                     />
                     <TouchableOpacity
                     style={styles.searchButton}
                     onPress={() =>{
                         this.setState({isSearchPressed:true});
                         this.getWord(this.state.text)
                     }}
                     ><Text style={styles.buttonText}>Search</Text></TouchableOpacity>
                     <View style={styles.detailsContainer}>
                         <Text style={styles.detailsTitle}>
                             Word: {" "}
                         </Text>
                         <Text style={{fontSize:18}}>
                             {this.state.word}
                         </Text>
                     </View>
                     <View style={styles.detailsContainer}>
                         <Text style={styles.detailsTitle}>
                             Type:{" "}
                         </Text>
                         <Text style={{fontSize:18}}>
                             {this.state.lexicalCategory}
                         </Text>
                     </View>
                     <View style={styles.detailsContainer}>
                         <Text style={styles.detailsTitle}>
                             Definition:{" "}
                         </Text>
                         <Text style={{fontSize:18}}>
                             {this.state.defination}
                         </Text>
                     </View>
              </View>
          )
      }
  }

  const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox:{
     marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton:{
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 50,
    marginBottom:50,
    width: 200,
    height: 50,
    backgroundColor: 'yellow'
  },
  buttonText:{
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize:20
  },
  detailsContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'violet',
    padding:10
  },
  detailsTitle:{
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  }
  })