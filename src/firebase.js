import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

    //Configurações do seu projeto
    let firebaseConfig = {
      apiKey: "AIzaSyAh2urSVc4KzbDMEwxS8pajDc92wNovdFA",
      authDomain: "blog-9da73.firebaseapp.com",
      databaseURL: "https://blog-9da73.firebaseio.com",
      projectId: "blog-9da73",
      storageBucket: "blog-9da73.appspot.com",
      messagingSenderId: "950195647487",
      appId: "1:950195647487:web:1d58960d52023c43726dca",
      measurementId: "G-KLMQ39G6JR"
    };

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);

    //Referenciando a database para acessar em outros locais
    this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logout(){
    return app.auth().signOut();
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })

  }

  isInitialized(){
      return new Promise(resolve =>{
          app.auth().onAuthStateChanged(resolve);
      })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback);

  }

}

export default new Firebase();