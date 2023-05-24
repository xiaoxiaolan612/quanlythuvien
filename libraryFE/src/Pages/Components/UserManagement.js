import { useEffect, useState } from "react"

const token = localStorage.getItem( "token" )

const ShowUser = ( props ) =>
{
    const [ customUser, setCustomUser ] = useState( [] )
    const [ username, setUsername ] = useState( '' )

    const [ users, setUsers ] = useState( [] )
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/auth/info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( ( response ) => response.json() )
                .then( ( data ) => setCustomUser( data ) )
                .catch( ( err ) => console.log( err ) );
        }, []
    )
    const getList = () =>
    {
        fetch( "http://localhost:8080/api/auth/list", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ token }`
            },
        } )
            .then( ( response ) => response.json() )
            .then( ( data ) => setUsers( data ) )
            .catch( ( err ) => console.log( err ) );

    }
    useEffect(
        () =>
        {
            getList()

        }, []
    )

    const deleteUser = ( id ) =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( "Bạn chắc chắn muốn xoá nguời dùng này?" ) )
        {
            fetch( "http://localhost:8080/api/auth/" + `${ id }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( response => response.text() )
                .then( data =>
                {
                    // console.log( data )
                    getList()
                } )
                .catch( error => console.error( error ) )
        }
    }
    console.log( users )
    return (
        <>

            {/* <div className="fpassword">
                    <button class="btn btn-info" onClick={ () => handleSubmit() }>Save</button>
                </div> */}
            <br />
            <div className="fpassword">
                <button type="" className="btn btn-info" onClick={ () =>
                {
                    props.setId( -1 )
                    props.setEdit( true )
                } }>+</button>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <label for="exampleFormControlTextarea1">Tên đăng nhập</label>
                            <input type="text" class="form-control" placeholder="Username"
                                name="username"
                                value={ username }
                                onChange={ ( e ) => setUsername( e.target.value ) }
                            />
                        </div>



                    </div>
                    <br />
                </div>
            </div>
            <table class="timetable_sub table-responsive">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Họ và tên</th>
                        <th>Tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Cấp bậc</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users
                            .filter(
                                user =>
                                {
                                    return user.username.includes( username )
                                }
                            )
                            .map(
                                ( user ) => (
                                    <tr class="rem1">
                                        <td class="invert">1</td>
                                        <td class="invert-image">
                                            {
                                                user.firstName && user.lastName && (
                                                    user.firstName + ' ' + user.lastName
                                                )
                                            }
                                        </td>
                                        <td class="invert">
                                            { user.username }
                                        </td>
                                        <td class="invert">{ user.password }</td>

                                        <td class="invert">{ user.roles ? user.roles : 'Khoá tạm thời' }</td>

                                        <td class="invert">
                                            {
                                                user.username === customUser.username ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <button type="" className="btn btn-success" onClick={ () =>
                                                        {
                                                            props.setEdit( true )
                                                            props.setId( user.userId )
                                                        } } >Chỉnh sửa</button>
                                                        <button type="" className="btn btn-danger"
                                                            onClick={ () => deleteUser( user.userId ) }
                                                        >Xoá</button>
                                                    </>
                                                )
                                            }

                                        </td>
                                    </tr>
                                )
                            )
                    }

                </tbody>
            </table>
        </>
    )
}

const EditUser = ( props ) =>
{
    const [ user, setUser ] = useState( [] )

    const handleChange = ( event ) =>
    {
        const { name, value } = event.target;
        setUser( prevData => ( { ...prevData, [ name ]: value } ) );
    }
    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/auth/" + `${ props.id }`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( ( response ) => response.json() )
                .then( ( data ) => setUser( data ) )
                .catch( ( err ) => console.log( err ) );

        }, []
    )
    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        fetch( "http://localhost:8080/api/auth/" + `${ props.id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ token }`
            },
            body: JSON.stringify( { "user": user } )

        } )
            .then( response =>
            {
                if ( response.ok )
                {
                    props.setEdit( false )
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

            } )
            .catch( error => console.error( error ) )
    }
    console.log( user )
    return (
        <>
            <div className="fpassword">
                <button type="" className="btn btn-dark" onClick={ () => props.setEdit( false ) }>Back</button>
            </div>
            <form onSubmit={ handleSubmit }>
                <div class="form-group">
                    <label for="exampleInputEmail1">Tài khoản</label>
                    <input type="name" class="form-control" placeholder="Username" name="username" value={ user.username } onChange={ handleChange } required />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Mật khẩu</label>
                    <input type="name" class="form-control" placeholder="Password" name="password" value={ user.password } onChange={ handleChange } required />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Cấp bậc</label>
                    <select
                        className='form-control'
                        name="roles"
                        value={ user.roles }
                        onChange={ handleChange }
                    >
                        <option value={ user.roles }>
                            { user.roles ? user.roles : "Khoá tạm thời" }
                        </option>
                        <option value="USER">
                            USER
                        </option>
                        <option value="MEMBER">
                            MEMBER
                        </option>
                        <option value="ADMIN">
                            ADMIN
                        </option>
                        <option value="">
                            Khoá tạm thời
                        </option>
                    </select>
                </div>
                <br />
                <div className="fpassword">
                    <button type="submit" class="btn btn-info">Save</button>
                </div>
                <br />
            </form>
        </>
    )
}


const UserManegament = ( props ) =>
{
    const [ edit, setEdit ] = useState( false )
    const [ id, setId ] = useState( -1 )
    return (
        <>

            <div className="left-ads-display col-md-10">
                <div className="wrapper_top_shop">
                    {/* <!-- product-sec1 --> */ }
                    <div className="product-sec1">
                        <div className="col-md-12 product-men">
                            <div className="product-chr-info chr">
                                {
                                    edit ? (
                                        <EditUser
                                            setEdit={ setEdit }
                                            id={ id }
                                            setId={ setId }
                                        />
                                    ) : (
                                        <ShowUser
                                            setEdit={ setEdit }
                                            id={ id }
                                            setId={ setId }
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    {/* <!-- //product-sec1 --> */ }
                    <div className="clearfix"></div>

                </div>
                <br /><br /><br /><br /><br /><br />

            </div>
        </>
    )
}
export default UserManegament