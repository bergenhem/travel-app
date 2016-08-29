import Firebase from "firebase";
import Configuration from "../../../config";

Firebase.initializeApp(Configuration.firebaseConfig);

const AuthHelper = {
  _currentUser: {},
  getUser: function() {
    return _currentUser;
  },
  login: function(email, password, createNotification) {
    Firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log("logged in, yo!");
      console.log(user);
    })
    .catch(function (error) {
      console.log("Error when signing in");
      createNotification("error", error.message, "Error logging in", 4000);
    });
  },
  logout: function() {

  },
  requireAuth: function(nextState, replace) {
    var user = Firebase.auth().currentUser;
    if(user) {
      console.log("user is logged in!");
      console.log(user);
      _currentUser = user;
    }
    else { // no user is logged in, redirect to login view
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }
};

export default AuthHelper;
