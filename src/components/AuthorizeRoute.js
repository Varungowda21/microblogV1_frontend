import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/Auth-context";

export default function AuthorizeRoute(props){
  const {user}=useContext(AuthContext)
  if(!user){
    return <p>Loading..!</p>
  }
  if(props.permittedRoles.includes(user.role)){
       return props.children
  }else{
       return <Navigate to='/forbidden'/>
  }
}