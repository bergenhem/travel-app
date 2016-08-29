import Firebase from "firebase";
import Configuration from "../../../config";

Firebase.initializeApp(Configuration.firebaseConfig);

const AuthHelper = {
  _currentUser: {},
  getUser: function() {
    return _currentUser;
  },
  login: function(email, password, createNotification, router) {
    Firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      router.push("/");
    })
    .catch(function (error) {
      console.log(error);
      createNotification("error", error.message, "Error logging in", 4000);
    });
  },
  logout: function() {

  },
  requireAuth: function(nextState, replace) {
    var user = Firebase.auth().currentUser;
    if(user) {
      this._currentUser = user;
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
