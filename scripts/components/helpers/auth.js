import Firebase from "firebase";
import Configuration from "../../../config";

Firebase.initializeApp(Configuration.firebaseConfig);

const AuthHelper = {
  _currentUser: {},
  setUser: function(user) {
    _currentUser = user;
  },
  getUser: function() {
    return _currentUser;
  },
  login: function() {

  },
  logout: function() {

  },
  checkIfUserIsLoggedIn: function() {

  },
  requireAuth: function(nextState, replace) {
    if(Firebase.auth().currentUser === null) {
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }
};

export default AuthHelper;
