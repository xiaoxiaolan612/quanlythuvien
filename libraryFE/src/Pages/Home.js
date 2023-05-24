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
import Footer from "./Components/Childrens/Footer"
import SingleBook from "./SingleBook"
import Axios from "axios"



const Home = () =>
{
    const token = localStorage.getItem( "token" )
    const [ keyword, setKeyword ] = useState( "" )
    const [ customUser, setCustomUser ] = useState( [] )
    const [ categoryList, setCategoryList ] = useState( [] )
    const [ author, setAuthor ] = useState( '' )
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
                .then( ( response ) =>
                {
                    if ( response.ok )
                    {
                        return response.json()
                    }
                    else
                    {

                        return response.json()
                    }
                } )
                .then( ( data ) =>
                {
                    if ( data === null )
                    {
                        localStorage.removeItem( "token" )
                    }
                    setCustomUser( data )
                } )
                .catch( ( err ) => console.log( err ) );
        }, []
    )
    useEffect(
        () =>
        {
            console.log( categoryList )
        }, [ categoryList ]
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
                        setKeyword={ setKeyword }
                    />
                    <br />
                    <br />
                    <br />
                    <br />


                    <Banner
                    />


                    <div className="innerf-pages section">
                        <div className="container-cart">
                            <div className="side-bar col-md-3">
                                <Categories
                                    categoryList={ categoryList }
                                    setCategoryList={ setCategoryList }
                                />
                                <SearchAuthor
                                    setAuthor={ setAuthor }
                                />
                                {/* <PriceRange /> */ }
                                <Latest />
                                <CustomerReview />
                            </div>
                            <div className="left-ads-display col-md-9">

                                <div className="wrapper_top_shop">
                                    <div className="product-sec1">
                                        <ListBook
                                            author={ author }
                                            keyword={ keyword }
                                            customUser={ customUser }
                                            categoryList={ categoryList }
                                        />
                                    </div>

                                </div>

                            </div>
                            <div className="clearfix"></div>
                        </div>

                    </div>

                    <Footer />


                </div>
            </body>
        </>
    )
}
export default Home