import { useEffect, useState } from "react";
import { Logout } from "../../Login";


const Navbar = ( props ) =>
{
    const [ books, setBooks ] = useState( [] )
    const [ keyword, setKeyword ] = useState( '' )
    const getList = () =>
    {
        fetch( "http://localhost:8080/api/book/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setBooks( data ) )
            .catch( ( err ) => console.log( err ) );

    }
    useEffect(
        () =>
        {
            getList()

        }, []
    )
    const token = localStorage.getItem( "token" )
    return (
        <>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="main-nav">
                    <div className="container">
                        <div className="navbar-header page-scroll">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-ex1-collapse">
                                <span className="sr-only">Library</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <h1>
                                <a className="navbar-brand" href="/">Library</a>
                            </h1>
                        </div>
                        <div className="collapse navbar-collapse navbar-ex1-collapse nav-right">

                            <ul className="nav navbar-nav navbar-left cl-effect-15">

                                <li>
                                    <a href="/">
                                        <small>Trang chủ</small>
                                    </a>
                                </li>

                                {/* <li className="dropdown">
                                    <a href="/" className="dropdown-toggle effect-3" data-toggle="dropdown">shop
                                        <b className="caret"></b>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a href="shop.html">product catalog</a>
                                        </li>
                                        <li>
                                            <a href="single_product.html">single product</a>
                                        </li>
                                        <li>
                                            <a href="checkout.html">checkout</a>
                                        </li>
                                        <li>
                                            <a href="payment.html">Payment</a>
                                        </li>
                                    </ul>
                                </li> */}
                                {
                                    props.firstname !== undefined && props.lastname !== undefined && token ? (
                                        <li className="dropdown">

                                            <a href="login.html" title="SignIn & SignUp" className="dropdown-toggle effect-3" data-toggle="dropdown">
                                                <small>
                                                    <span className="fa fa-user nav-icon" aria-hidden="true"></span>
                                                    {
                                                        props.firstname !== undefined && props.lastname !== undefined ? (
                                                            <>
                                                                <strong>{ ' ' + props.firstname + ' ' + props.lastname }</strong>
                                                            </>
                                                        ) : (
                                                            <>
                                                            </>
                                                        )
                                                    }

                                                    {/* <b className="caret"></b> */ }
                                                </small>


                                            </a>
                                            <ul className="dropdown-menu">
                                                {
                                                    props.roles === 'ADMIN' && (
                                                        <li>
                                                            <a href="/admin">Quản lí</a>
                                                        </li>
                                                    )
                                                }
                                                <li>
                                                    <a href="/profile">Thông tin cá nhân</a>
                                                </li>


                                                <li>
                                                    <a onClick={ () => Logout() }>Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li>
                                            <a title="SignIn & SignUp" href="/login">
                                                <span aria-hidden="true">Đăng nhập</span>
                                            </a>
                                        </li>
                                    )
                                }
                            </ul>
                            {
                                props.firstname ? (
                                    <>
                                        <div className="cart-mainf">
                                            <div className="chrcart chrcart2 cart cart box_1">
                                                <a href="/cart" className="top_chr_cart" type="submit" name="submit" value="">
                                                    <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                                                </a>

                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )
                            }


                        </div>


                        <div className="clearfix"></div>
                        <div className="row">
                            <div className="col-sm-11">
                                <input placeholder="Nhập tên sách bạn muốn" className="form-control"
                                    value={ keyword }
                                    onChange={ ( e ) => setKeyword( e.target.value ) }
                                />
                                <ul class="list-group">
                                    {
                                        books
                                            .filter(
                                                book =>
                                                {
                                                    return ( book.bookName.toLowerCase().includes( keyword.toLowerCase() ) && keyword.length > 0 );
                                                }
                                            )
                                            .map(
                                                ( book ) => (
                                                    <>
                                                        <li class="list-group-item"
                                                            onClick={ () => setKeyword( book.bookName ) }
                                                        >{ book.bookName }</li>
                                                    </>
                                                )
                                            )
                                    }
                                </ul>
                            </div>
                            <div className="col-md-1">
                                <a className="cd-search-trigger" onClick={
                                    () =>
                                    {
                                        setKeyword( '' )
                                        props.setKeyword( keyword )
                                    }
                                }>
                                    <span></span>
                                </a>
                            </div>
                        </div>





                    </div>
                    <button type="" className="btn btn-success" ></button>
                </div>
            </nav>
        </>
    )
}
export default Navbar;