import { useEffect, useState } from "react"
import Banner from "./Components/Childrens/Banner"
import BreadCrumbs from "./Components/Childrens/BreadCrumbs"
import Categories from "./Components/Childrens/Categories"
import CustomerReview from "./Components/Childrens/CustomerReview"
import Latest from "./Components/Childrens/Latest"
import ListBook from "./Components/Childrens/ListBook"
import Navbar from "./Components/Childrens/Navbar"
import PriceRange from "./Components/Childrens/PriceRange"
import SearchAuthor from "./Components/Childrens/SearchAuthor"
import CategoryManegament from "./Components/CategoryManegement"
import Footer from "./Components/Childrens/Footer"
import BookManegament from "./Components/BookManegement"
import UserManegament from "./Components/UserManagement"
import OrderManegament from "./Components/OrderManagement"
import BorowManegament from "./Components/BorrowManagement"



const Admin = () =>
{
    const token = localStorage.getItem( "token" )
    const [ customUser, setCustomUser ] = useState( [] )
    const [ categoryON, setCategoryOn ] = useState( false )
    const [ bookON, setBookOn ] = useState( true )
    const [ userON, setUserOn ] = useState( false )
    const [ orderON, setOrderOn ] = useState( false )
    const [ borowON, setBorowOn ] = useState( false )


    console.log( JSON.stringify( { "token": token } ) )

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

    useEffect(
        () =>
        {
            console.log( userON )
            console.log( categoryON )
            console.log( orderON )
            console.log( bookON )
        }, [ categoryON, bookON, userON, orderON ]
    )

    console.log( customUser )
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
                    <div className="innerf-pages section">
                        <div className="">
                            <div className="col-md-2">
                                <div className="left-side">
                                    <ul class="list-group list-group-horizontal-sm">
                                        <li class="list-group-item list-group-item-success"
                                            onClick={ () =>
                                            {
                                                setCategoryOn( true )
                                                setBookOn( false )
                                                setUserOn( false )
                                                setOrderOn( false )
                                                setBorowOn( false )
                                            } }
                                        >Thể loại</li>
                                        <li class="list-group-item list-group-item-success"
                                            onClick={ () =>
                                            {
                                                setCategoryOn( false )
                                                setBookOn( true )
                                                setUserOn( false )
                                                setOrderOn( false )
                                                setBorowOn( false )
                                            } }
                                        >Sách</li>
                                        <li class="list-group-item list-group-item-success"
                                            onClick={ () =>
                                            {
                                                setCategoryOn( false )
                                                setBookOn( false )
                                                setUserOn( true )
                                                setOrderOn( false )
                                                setBorowOn( false )
                                            } }
                                        >Tài khoản người dùng</li>
                                        <li class="list-group-item list-group-item-success"

                                        >Bình luận người dùng</li>
                                        <li class="list-group-item list-group-item-success"
                                            onClick={ () =>
                                            {
                                                setCategoryOn( false )
                                                setBookOn( false )
                                                setUserOn( false )
                                                setOrderOn( true )
                                                setBorowOn( false )
                                            } }
                                        >Danh sách đơn hàng</li>
                                        <li class="list-group-item list-group-item-success"
                                            onClick={ () =>
                                            {
                                                setCategoryOn( false )
                                                setBookOn( false )
                                                setUserOn( false )
                                                setOrderOn( false )
                                                setBorowOn( true )
                                            } }
                                        >Danh sách mượn sách</li>
                                    </ul>
                                </div>
                            </div>

                            {
                                categoryON && <CategoryManegament />
                            }

                            {
                                bookON && <BookManegament />
                            }

                            {
                                userON && <UserManegament />
                            }

                            {
                                orderON && <OrderManegament />
                            }
                            {
                                borowON && <BorowManegament />
                            }

                        </div>
                    </div>
                </div>
            </body >

        </>
    )
}
export default Admin