import Firebase from "firebase";
import Configuration from "../../../config";

Firebase.initializeApp(Configuration.firebaseConfig);

const AuthHelper = {
  getUser: function() {
    var user = Firebase.auth().currentUser();
    return user;
  },
  login: function(email, password, createNotification, router) {
    var that = this;
    Firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      router.push("/");
    })
    .catch(function (error) {
      createNotification("error", error.message, "Error logging in", 4000);
    });
  },
  logout: function() {
    Firebase.auth().signOut()
    .then(function() {
      console.log("User logged out");
    })
    .catch(function(error) {
      console.log("An error occurred ")
    });
  },
  // Check if we're trying to go to our main area ("/") and if so redirect if we are not logged in
  requireAuth: function(nextState, replace) {
    if(nextState.location.pathname === "/") {
      if(!Firebase.auth().currentUser) {
        /* We need to check if a previous user exists in localStorage or not.
           This is due to needing Firebase to check for users (it can take a bit)
        */
        var localStorageUser = false;
        for(var key in localStorage) {
          if(key.startsWith("firebase:authUser:")) {
            localStorageUser = true;
          }
        }
        if(!localStorageUser) {
          replace({
            pathname:"/login",
            state: { nextPathname: nextState.location.pathname }
          });
        }
      }
    }
  },
  recoverPassword: function(email, createNotification, router) {
    Firebase.auth().sendPasswordResetEmail(email)
    .then(function() {
      router.push("/login");
    })
    .catch(function(error) {
      createNotification("error", error.message, "Error resetting password", 4000);
    });
  }
};

export default AuthHelper;
