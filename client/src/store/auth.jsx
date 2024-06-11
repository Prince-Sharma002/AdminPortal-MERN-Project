import { Children, createContext , useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


// it contains the passing information
export const AuthProvider = ({ children }) => {
    
    const [token , setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState({});
    const [servicedata , setServiceData] = useState({});
    const [authorizationToken, setAuthorizationToken] = useState(`Bearer ${token}`);
    const [isLoading , setIsLoading ] = useState(true);


    const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    const userAuthentication = async ()=>{
        console.log("authorize" , authorizationToken);
        setIsLoading(true);
        try
        {
            const response = await fetch("http://localhost:5000/admin/user" , {
                method : "GET",
                headers : {
                    "Authorization" : authorizationToken,
                }
            });
            
            if( response.ok ){
                const data = await response.json();
                console.log("user "  , data.msg);
                console.log("data: " ,  data);
                setUser(data.msg);
                setIsLoading(false);
            }else{
                setIsLoading(false);
            }


            

        }
        catch(err){
            console.log("error fetching data : " , err);
        }
    }

    const getServices = async()=>{
        try{
            const response = await fetch('http://localhost:5000/data/service',
                {
                    method : "GET" , 
                }
            )
            
            if( response.ok ){
                const data = await response.json();
                console.log("data is " , data);
                setServiceData(data.msg);
            }

        }catch(err){
            console.log("frontend error fetching services : " , err);
        }
    }

    useEffect(()=>{
        userAuthentication();
        getServices();
    } , [])

    const storetokenInLS = (servertoken)=>{
        setToken(servertoken);
        return localStorage.setItem("token" , servertoken );
    }

    let isLoggedIn = !!token;


    return (
        <AuthContext.Provider value={{storetokenInLS , LogoutUser , isLoggedIn , user , servicedata , authorizationToken , isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue)
        throw new Error("useAuth must be used within an AuthProvider");
    return authContextValue;
}