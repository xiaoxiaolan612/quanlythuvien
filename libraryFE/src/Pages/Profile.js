import { useEffect, useState } from "react"
import Footer from "./Components/Childrens/Footer"
import Navbar from "./Components/Childrens/Navbar"

const token = localStorage.getItem( "token" )
var changePassword = false

export const ChangePassword = () =>
{
    const [ customUser, setCustomUser ] = useState( [] )
    const [ password, setPassword ] = useState( '' )
    const [ oldPassword, setOldPassword ] = useState( '' )
    const [ newPassword1, setNewPassword1 ] = useState( '' )
    const [ newPassword2, setNewPassword2 ] = useState( '' )

    var LoadPassword = false
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/auth/info", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${ token }`,
                    'Content-Type': 'application/json'
                }
            } )
                .then( ( response ) => response.json() )
                .then( ( data ) =>
                {
                    if ( LoadPassword === false )
                    {
                        setPassword( data.password )
                        LoadPassword = true
                    }
                    setCustomUser( data )

                } )
                .catch( ( err ) => console.log( err ) );
        }, []
    )
    useEffect(
        () =>
        {
            console.log( password )
            console.log( newPassword1 )
            console.log( newPassword2 )
        }, [ newPassword1, newPassword2 ]
    )
    useEffect(
        () =>
        {
            console.log( changePassword )
            console.log( newPassword1 )
            console.log( newPassword2 )
            console.log( customUser )
        }, [ customUser ]
    )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        if ( oldPassword === password )
        {
            if ( newPassword1 !== '' && newPassword1 === newPassword2 )
            {
                if ( newPassword1 === oldPassword )
                {
                    alert( 'Mật khẩu mới giống mật khẩu cũ' )
                }
                else
                {
                    setCustomUser( prevData => ( { ...prevData, password: newPassword1 } ) )
                    changePassword = true
                }
            }
            else
            {
                alert( 'Mật khẩu mới không giống nhau' )
            }
        }
        else
        {
            alert( 'Mật khẩu cũ không đúng !' )
        }

    }

    if ( customUser.password === newPassword1 && customUser.password === newPassword2 && changePassword === true )
    {

        fetch( "http://localhost:8080/api/auth/" + `${ customUser.userId }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ token }`
            },
            body: JSON.stringify( { "user": customUser } )

        } )
            .then( response =>
            {
                if ( response.ok )
                {
                    setOldPassword( '' )
                    setNewPassword1( '' )
                    setNewPassword2( '' )
                    window.location.href = "/profile"

                    return response.text()
                }
                else
                {

                    return response.text()
                }
            } )
            .then( data =>
            {
                console.log( data )
                if ( data !== '' )
                {
                    alert( data )
                }
                else
                {
                    alert( "Cập nhật thành công!!!" )
                }

            } )
            .catch( error => console.error( error ) )
        changePassword = false
    }
    return (
        <>
            <form onSubmit={ handleSubmit }>
                <div class="row">
                    <div class="col-md-12">
                        <label for="exampleFormControlTextarea1">Mật khẩu cũ</label>
                        <input type="password" class="form-control" placeholder="Password"
                            value={ oldPassword }
                            onChange={ ( e ) => setOldPassword( e.target.value ) }
                            required

                        />
                        <label for="exampleFormControlTextarea1">Mật khẩu mới</label>
                        <input type="password" class="form-control" placeholder="New Password"
                            value={ newPassword1 }
                            onChange={ ( e ) => setNewPassword1( e.target.value ) }
                            required
                        />
                        <label for="exampleFormControlTextarea1">Nhập lại mật khẩu mới</label>
                        <input type="password" class="form-control" placeholder="Confirm New Password"
                            value={ newPassword2 }
                            onChange={ ( e ) => setNewPassword2( e.target.value ) }
                            required
                        />
                        <br />
                    </div>

                </div>
                <div className="fpassword">
                    <button class="btn btn-info" >Save</button>
                </div>
                <br />
            </form>
        </>
    )
}

export const Info = () =>
{
    const [ customUser, setCustomUser ] = useState( [] )
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/auth/info", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${ token }`,
                    'Content-Type': 'application/json'
                }
            } )
                .then( ( response ) => response.json() )
                .then( ( data ) => setCustomUser( data ) )
                .catch( ( err ) => console.log( err ) );
        }, []
    )
    const handleChange = ( event ) =>
    {
        const { name, value } = event.target;
        setCustomUser( prevData => ( { ...prevData, [ name ]: value } ) );
    }
    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        fetch( "http://localhost:8080/api/auth/" + `${ customUser.userId }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ token }`
            },
            body: JSON.stringify( { "user": customUser } )

        } )
            .then( response =>
            {
                if ( response.ok )
                {
                    window.location.href = "/profile"
                    return response.text()
                }
                else
                {

                    return response.text()
                }
            } )
            .then( data =>
            {
                console.log( data )
                if ( data !== '' )
                {
                    alert( data )
                }
                else
                {
                    alert( "Cập nhật thành công!!!" )
                }

            } )
            .catch( error => console.error( error ) )
    }
    useEffect(
        () =>
        {
            console.log( customUser )
        }, [ customUser ]
    )
    console.log( customUser )
    return (
        <>
            <form onSubmit={ handleSubmit }>
                <div class="row">
                    <div class="col-md-12">
                        <div className="row">
                            <div className="col-md-4">
                                <label for="exampleFormControlTextarea1">Họ</label>
                                <input type="text" class="form-control" placeholder="Họ"
                                    name="firstName"
                                    value={ customUser.firstName }
                                    onChange={ handleChange }
                                />
                            </div>

                            <div className="col-md-4">
                                <label for="exampleFormControlTextarea1">Tên</label>
                                <input type="text" class="form-control" placeholder="Tên"
                                    name="lastName"
                                    value={ customUser.lastName }
                                    onChange={ handleChange }
                                />
                            </div>
                            <div className="col-md-4">
                                <label for="exampleFormControlTextarea1">Email cá nhân</label>
                                <input type="text" class="form-control" placeholder="Email"
                                    name="email"
                                    value={ customUser.email }
                                    onChange={ handleChange }
                                />
                            </div>
                        </div>
                        <br />
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Địa chỉ</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Mô tả chi tiết"
                                name="address"
                                value={ customUser.address }
                                onChange={ handleChange }
                            ></textarea>
                        </div>

                        <label for="exampleFormControlTextarea1">Ngày sinh</label>
                        <input type="date" class="form-control"
                            name="date"
                            value={ customUser.date }
                            onChange={ handleChange }
                        />
                        <label for="exampleFormControlTextarea1">Số điện thoại</label>
                        <input type="text" class="form-control" placeholder="Số điện thoại"
                            name="phone"
                            value={ customUser.phone }
                            onChange={ handleChange }
                        />
                        <label for="exampleFormControlTextarea1">Nơi làm việc</label>
                        <input type="text" class="form-control" placeholder="Nơi làm việc"
                            name="company"
                            value={ customUser.company }
                            onChange={ handleChange }

                        />
                        <label for="exampleFormControlTextarea1">Chức vụ</label>
                        <input type="text" class="form-control" placeholder="Chức vụ"
                            name="position"
                            value={ customUser.position }
                            onChange={ handleChange }
                        />
                        <br />



                    </div>

                </div>
                <div className="fpassword">
                    <button class="btn btn-info" >Save</button>
                </div>
                <br />
            </form>
        </>
    )
}

const Profile = () =>
{
    const [ customUser, setCustomUser ] = useState( [] )
    const [ newPassword, setNewPassword ] = useState( false )
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/auth/info", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${ token }`,
                    'Content-Type': 'application/json'
                }
            } )
                .then( ( response ) => response.json() )
                .then( ( data ) => setCustomUser( data ) )
                .catch( ( err ) => console.log( err ) );
        }, []
    )

    return (
        <>
            <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
                <div id="home">
                    <Navbar
                        firstname={ customUser.firstName }
                        lastname={ customUser.lastName }
                        roles={ customUser.roles }
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br /><br /><br /><br /><br />
                    <div className="col-md-2">

                    </div>
                    <div className="left-ads-display col-md-8">
                        <div className="wrapper_top_shop">
                            {/* <!-- product-sec1 --> */ }
                            <div className="product-sec1">
                                <div className="col-md-12 product-men">
                                    <div className="product-chr-info chr">
                                        <div className="fpassword">
                                            <button type="" className="btn btn-danger" onClick={ () => setNewPassword( !newPassword ) }>
                                                {
                                                    newPassword ? 'x' : 'Đổi mật khẩu'
                                                }
                                            </button>
                                        </div>
                                        {
                                            newPassword ? (
                                                <ChangePassword />
                                            ) : (
                                                <Info />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>

                            {/* <!-- //product-sec1 --> */ }
                            <div className="clearfix"></div>

                        </div>


                    </div>
                    <div className="col-md-1">
                    </div>


                </div >

                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />

                <Footer />
            </body >

        </>
    )

}
export default Profile