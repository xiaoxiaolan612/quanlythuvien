import { useState } from "react"
import Banner from "./Components/Childrens/Banner"
import Footer from "./Components/Childrens/Footer"
import Navbar from "./Components/Childrens/Navbar"

const Register = () =>
{
    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ repassword, setRepassword ] = useState( '' )
    const [ firstname, setFirstname ] = useState( '' )
    const [ lastname, setLastname ] = useState( '' )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        if ( username === '' )
        {
            return alert( 'Please Enter Username' )
        }
        if ( firstname === '' )
        {
            return alert( 'Please Enter Firstname' )
        }
        if ( lastname === '' )
        {
            return alert( 'Please Enter Lastname' )
        }
        if ( password === '' )
        {
            return alert( 'Please Enter Password' )
        } if ( repassword === '' )
        {
            return alert( 'Please Enter Re-Enter Password' )
        }
        if ( password === repassword && password !== '' && username !== '' && firstname !== '' && lastname !== '' )
        {
            console.log(
                JSON.stringify( {
                    "username": username,
                    "password": password,
                    "firstname": firstname,
                    "lastname": lastname
                } )
            )
            fetch( "http://localhost:8080/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    "username": username,
                    "password": password,
                    "firstname": firstname,
                    "lastname": lastname,
                    "role": "USER"
                } )
            } )
                .then( response =>
                {
                    if ( response.ok )
                    {
                        window.location.href = "/login"
                        return response.json()
                    }
                    else
                    {
                        alert( "Username already exists!!!" )
                        return response.body()
                    }
                } )
                .then( data =>
                {
                } )
                .catch( error => console.error( error ) )
        }
        else
        {
            return alert( "Your password is not the same!!!" )
        }
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
                    {/* <!--//breadcrumbs ends here--> */ }
                    {/* <!-- signin and signup form --> */ }
                    <div class="login-form section text-center">
                        <div class="container">
                            <h4 class="rad-txt">
                                <span class="abtxt1">Sign in</span>
                                <span class="abtext">sign up</span>
                            </h4>
                            <div id="signupbox" style={ { marginTop: "50px" } } class="mainbox loginbox">
                                <div class="panel panel-info">
                                    <div class="panel-heading">
                                        <div class="panel-title">Sign Up</div>

                                    </div>
                                    <div class="panel-body">
                                        <form onSubmit={ handleSubmit } id="signupform" class="form-horizontal">
                                            <div id="signupalert" style={ { display: "none" } } class="alert alert-danger">
                                                <p>Error:</p>
                                                <span></span>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">Username</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="text" class="form-control" name="email"
                                                        placeholder="Username" required="" onChange={ ( e ) => setUsername( e.target.value ) } />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">First Name</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="text" class="form-control" name="firstname"
                                                        placeholder="First Name" required="" onChange={ ( e ) => setFirstname( e.target.value ) } />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">Last Name</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="text" class="form-control" name="lastname"
                                                        placeholder="Last Name" required="" onChange={ ( e ) => setLastname( e.target.value ) } />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">Password</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="password" class="form-control" name="passwd"
                                                        placeholder="Password" required="" onChange={ ( e ) => setPassword( e.target.value ) } />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-3 control-label">Re-enter Password</label>
                                                <div class="col-md-9 col-sm-9 col-xs-9">
                                                    <input type="password" class="form-control" name="passwd"
                                                        placeholder="Password" onChange={ ( e ) => setRepassword( e.target.value ) } required="" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="signup-btn">
                                                    <button id="btn-signup" type="submit" class="btn btn-info">
                                                        <i class="icon-hand-right"></i> &nbsp; Sign Up</button>
                                                </div>
                                            </div>
                                            <div style={ { float: "right", fontSize: "85%", position: "relative", top: "-10px" } }>
                                                <a id="signinlink" href="/login">Sign In</a>
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

export default Register