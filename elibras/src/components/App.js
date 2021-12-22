import React from "react"
import '../assets/styles/global.css'
import Signup from "./authentication/Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Profile from "./authentication/Profile"
import Login from "./authentication/Login"
import PrivateRoute from "./authentication/PrivateRoute"
import ForgotPassword from "./authentication/ForgotPassword"
import UpdateProfile from "./authentication/UpdateProfile"
import Dashboard from "./google-drive/Dashboard"
import Landing from "../pages/Landing/landing"
import LinkVideo from "../pages/LinkVideo/LinkVideo" 

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>

          {/* Drive */}
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

          {/* Profile */}
          <PrivateRoute path="/user" component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />

          {/* Auth */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* ADD Youtube link */}
          <PrivateRoute path="/videos" component={LinkVideo} />
          
          {/*Pagina inicial do projeto */}
          <Route path="/landing" component={Landing} />

          <Redirect to="/landing" />

        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
