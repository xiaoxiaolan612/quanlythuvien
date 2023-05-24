import { useState } from "react";
import Banner from "./Components/Childrens/Banner";
import Footer from "./Components/Childrens/Footer";
import Navbar from "./Components/Childrens/Navbar";

export const Logout = () =>
{
    localStorage.removeItem( "token" )
    window.location.href = "/login"
}

const Login = () =>
{

    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        fetch( "http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "username": username,
                "password": password,
            } )
        } )
            .then( response =>
            {
                if ( response.ok )
                {
                    window.location.href = "/"
                    return response.text()
                }
                else
                {
                    alert( "Wrong Username Or Password!!!" )
                    return response.text()
                }
            } )
            .then( data =>
            {
                localStorage.setItem( "token", data )
            } )
            .catch( error => console.error( error ) )
    }
    return (
        <>
            <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
                <div id="home">
                    <Navbar />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="login-form section text-center">
                        <div class="container">
                            <h4 class="rad-txt">
                                <span class="abtxt1">Sign in</span>
                                <span class="abtext">sign up</span>
                            </h4>
                            <div id="loginbox" style={ { marginTop: "30px" } } class="mainbox  loginbox">
                                <div class="panel panel-info">
                                    <div class="panel-heading">
                                        <div class="panel-title">Sign In</div>

                                    </div>
                                    <div style={ { paddingTop: "30px" } } class="panel-body">
                                        <div style={ { display: 'none' } } id="login-alert" class="alert alert-danger col-sm-12"></div>
                                        <form id="loginform" class="form-horizontal" onSubmit={ handleSubmit }>
                                            <div style={ { marginBottom: "25px" } } class="input-group">
                                                <span class="input-group-addon">
                                                    <i class="glyphicon glyphicon-user"></i>
                                                </span>
                                                <input id="login-username" type="text" class="form-control" name="username"
                                                    placeholder="username or email" required="" onChange={ ( e ) => setUsername( e.target.value ) } />
                                            </div>

                                            <div style={ { marginBottom: "25px" } } class="input-group">
                                                <span class="input-group-addon">
                                                    <i class="glyphicon glyphicon-lock"></i>
                                                </span>
                                                <input id="login-password" type="password" class="form-control" name="password"
                                                    placeholder="password" onChange={ ( e ) => setPassword( e.target.value ) } />

                                            </div>
                                            <div class="fpassword">
                                                <a href="#">Forgot password?</a>
                                            </div>
                                            <div style={ { marginTop: "10px" } } class="form-group">
                                                {/* <!-- Button --> */ }

                                                <div class="col-sm-12 controls">
                                                    <button id="btn-login" type="submit" class="btn btn-success"> Sign in </button>
                                                </div>
                                                <br />
                                                <br />
                                                <br />
                                                <br />

                                                <div class="col-sm-12 controls">
                                                    <a href="#" class="btn btn-primaries">Login with Facebook</a>
                                                    <a className="btn btn-dark"></a>
                                                    <a href="#" class="btn btn-danger">Login with Google</a>

                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-md-12 control">
                                                    <div style={ { borderTop: "1px solid#888", paddingTop: "15px", fontSize: "85%" } }>
                                                        Don't have an account!
                                                        <a href="/register">
                                                            Sign Up Here
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {/* <!--//signin and signup form ends here--> */ }
                {/* <!-- footer --> */ }
                <Footer />
            </body >

        </>
    )
}
export default Login