import { useEffect, useState } from "react"
import Navbar from "./Components/Childrens/Navbar"
import Banner from "./Components/Childrens/Banner"
import BreadCrumbs from "./Components/Childrens/BreadCrumbs"
import Categories from "./Components/Childrens/Categories"
import SearchAuthor from "./Components/Childrens/SearchAuthor"
import PriceRange from "./Components/Childrens/PriceRange"
import Latest from "./Components/Childrens/Latest"
import CustomerReview from "./Components/Childrens/CustomerReview"
import Footer from "./Components/Childrens/Footer"

const token = localStorage.getItem( "token" )
const id = localStorage.getItem( "bookID" )

const SingleBook = () =>
{
    const [ customUser, setCustomUser ] = useState( [] )
    const [ book, setBook ] = useState( [] )
    const [ order, setOrder ] = useState( [] )
    const [ userOn, setUserOn ] = useState( false )
    const [ priceBuy, setPriceBuy ] = useState( 0 )
    const [ priceBorrow, setPriceBorrow ] = useState( 0 )


    useEffect(
        () =>
        {
            const fetchData = async () =>
            {
                var resp1 = await fetch( "http://localhost:8080/api/BuyAndBorrow/-1", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                }
                )
                if ( resp1.ok )
                {
                    setUserOn( true )
                    var data1 = await resp1.json()
                    setOrder( data1 );
                }
                var resp2 = await fetch( "http://localhost:8080/api/book/" + `${ id }` )
                var data2 = await resp2.json()
                setBook( data2 )
                console.log( data2 )
                setPriceBuy( data2.price )
                setPriceBorrow( parseInt (data2.price * 0.3) )
                setOrder( prevData => ( { ...prevData, [ 'book' ]: data2 } ) )

                var resp3 = await fetch( "http://localhost:8080/api/auth/info", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                } )
                if ( resp3.ok )
                {
                    var data3 = await resp3.json()
                    setCustomUser( data3 )
                    setOrder( prevData => ( { ...prevData, [ 'user' ]: data3 } ) )
                    if ( data3.roles === 'MEMBER' || data3.roles === 'ADMIN' )
                    {
                        setPriceBuy( parseInt(data2.price * 0.7) )
                        setPriceBorrow( 0 )
                    }
                }
            }
            fetchData()
        }, []
    )
    useEffect(
        () =>
        {
            console.log( priceBuy )
            console.log( priceBorrow )
            console.log( order )
            console.log( book )
            console.log( customUser )
        }, [ order ]
    )
    useEffect(
        () =>
        {
            if ( order.options === 'buy' )
            {
                setOrder( prevData => ( { ...prevData, [ 'price' ]: priceBuy } ) )
            }
            else
            {
                setOrder( prevData => ( { ...prevData, [ 'price' ]: priceBorrow } ) )

            }

        }, [ priceBuy, priceBorrow, order.options ]
    )
    const handleSubmit = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/-1", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": order } )
        } )
        var text = await resp.text()
        if ( resp.ok )
        {
            alert( "Đã thêm vào giỏ hàng" )
        }
        else (
            alert( text )
        )
    }
    const handleBuy = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/-1", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": order } )
        } )
        var text = await resp.text()
        if ( resp.ok )
        {
            window.location.href = "/cart"
        }
        else (
            alert( text )
        )
    }
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
                    {/* <Banner
                    /> */}
                    {/* <BreadCrumbs
                        title='Sản phẩm'
                    /> */}



                    <div class="innerf-pages section">
                        <div class="container">
                            <div class="col-md-4 single-right-left ">
                                <div class="grid images_3_of_2">
                                    <div class="flexslider1">
                                        <ul class="slides">
                                            <li data-thumb="images/s1.jpg">
                                                <div class="thumb-image">
                                                    <img src={ book.bookImage } data-imagezoom="true" alt=" " class="img-responsive" /> </div>
                                            </li>

                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-8 single-right-left simpleCart_shelfItem">
                                <h3>{ book.bookName }
                                    {/* <span>Hardcover – Feb 2018</span> */ }
                                </h3>
                                <p>by
                                    <a href="/book">{ book.bookAuthor }</a>
                                </p>
                                <div class="caption">

                                    <ul class="rating-single">
                                        <li>
                                            <a href="#">
                                                <span class="fa fa-star yellow-star" aria-hidden="true"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="fa fa-star yellow-star" aria-hidden="true"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="fa fa-star yellow-star" aria-hidden="true"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="fa fa-star yellow-star" aria-hidden="true"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="fa fa-star yellow-star" aria-hidden="true"></span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="clearfix"> </div>
                                    <h6>
                                        ${ order.options === 'borrow' ? priceBorrow : priceBuy }
                                        {/* { order.options === 'borrow' && priceBorrow } */ }
                                    </h6>
                                </div>
                                <div class="desc_single">
                                    <h5>Mô tả</h5>
                                    <p>{ book.bookDescribe }</p>
                                </div>
                                <div class="occasional">
                                    <h5>Thông tin chi tiết</h5>
                                    <ul class="single_specific">
                                        <li>
                                            <span>Ngôn ngữ : </span>
                                            { book.language }
                                        </li>
                                        <li>
                                            {/* <span>format :</span> Hardcover</li>
                                        <li> */}
                                            <span>Nhà xuất bản : </span>
                                            { book.publisher }
                                        </li>
                                        <li>
                                            <span>Ngày xuất bản : </span>
                                            { book.bookDate }
                                        </li>
                                        <li>
                                            <span>Số trang :</span> { book.pageNumber }
                                        </li>
                                        <li>
                                            <span>Còn lại :</span> { order.options === 'buy' && book.buy }
                                            { order.options === 'borrow' && book.borrow }
                                        </li>
                                        {/* <li>
                                            <span>Số lượng :</span>
                                            {
                                                order.options === 'buy' ? (
                                                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                                        <div class="btn-group mr-2" role="group" aria-label="Second group">
                                                            <button type="button" class="btn btn-secondary"
                                                                onClick={ () =>
                                                                {
                                                                    if ( order.number === 1 )
                                                                    {
                                                                        alert( 'Số lượng tối thiểu là 1' )
                                                                    }
                                                                    else
                                                                    {
                                                                        setOrder( prevData => ( { ...prevData, [ 'number' ]: order.number - 1 } ) )
                                                                    }
                                                                } }
                                                            >-</button>
                                                            <button type="button" class="btn btn-secondary">{ order.number }</button>
                                                            <button type="button" class="btn btn-secondary"
                                                                onClick={ () =>
                                                                {
                                                                    if ( order.options === 'buy' )
                                                                    {
                                                                        if ( order.number === book.buy )
                                                                        {
                                                                            alert( 'Số lượng đã dạt mức tối đa' )
                                                                        }
                                                                        else
                                                                        {
                                                                            setOrder( prevData => ( { ...prevData, [ 'number' ]: order.number + 1 } ) )
                                                                        }
                                                                    }

                                                                } }
                                                            >+</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                                        <div class="btn-group mr-2" role="group" aria-label="Second group">

                                                            <button type="button" class="btn btn-secondary">{ order.number }</button>

                                                        </div>
                                                    </div>
                                                )
                                            }


                                        </li> */}
                                    </ul>

                                </div>

                                {
                                    userOn ? (
                                        <>
                                            <div class="color-quality">
                                                <div class="color-quality-right">
                                                    <h5>Lựa chọn</h5>
                                                    <select id="country1" onChange={ ( e ) =>
                                                    {
                                                        setOrder( prevData => ( { ...prevData, [ 'number' ]: 1 } ) )
                                                        setOrder( prevData => ( { ...prevData, [ 'options' ]: e.target.value } ) )

                                                    } } class="frm-field required sect">
                                                        <option value="buy">Mua sách: &nbsp;${ priceBuy }</option>
                                                        <option value="borrow">Mượn sách: &nbsp;${ priceBorrow }</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                            <br />
                                            <br />
                                            <br />
                                            <div class="occasion-cart">
                                                <div class="chr single-item single_page_b">
                                                    <div className="row">
                                                        <button type="submit" class="chr-cart pchr-cart"
                                                            onClick={ () => handleSubmit() }
                                                        >
                                                            <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                                            { ' ' }Thêm vào giỏ hàng
                                                        </button>
                                                        <button type="submit" class="chr-cart pchr-cart"
                                                            onClick={ () => handleBuy() }
                                                        >
                                                            <i aria-hidden="true"></i>
                                                            { ' ' }{
                                                                order.options === 'buy' ? 'Mua hàng' : 'Mượn sách'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }


                            </div>
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                    {/* <!-- /new_arrivals --> */ }
                    {/* <div class="section singlep_btm">
                        <div class="container">
                            <div class="new_arrivals">
                                <h4 class="rad-txt">
                                    <span class="abtxt1">featured</span>
                                    <span class="abtext"> products</span>
                                </h4>
                                <div class="col-md-3 product-men">
                                    <div class="product-chr-info chr">
                                        <div class="thumbnail">
                                            <a href="single_product.html">
                                                <img src="images/lib7.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div class="caption">
                                            <h4>Marketing</h4>
                                            <p>Scott Harris</p>
                                            <div class="matrlf-mid">
                                                <ul class="rating">
                                                    <li>
                                                        <a href="#">
                                                            <span class="fa fa-star yellow-star" aria-hidden="true"></span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span class="fa fa-star yellow-star" aria-hidden="true"></span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span class="fa fa-star yellow-star" aria-hidden="true"></span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span class="fa fa-star gray-star" aria-hidden="true"></span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span class="fa fa-star gray-star" aria-hidden="true"></span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul class="price-list">
                                                    <li>$ 180.00</li>
                                                    <li>
                                                        $220.00
                                                    </li>
                                                </ul>

                                                <div class="clearfix"> </div>
                                            </div>
                                            <form action="#" method="post">
                                                <input type="hidden" name="cmd" value="_cart" />
                                                <input type="hidden" name="add" value="1" />
                                                <input type="hidden" name="chr_item" value="Book1" />
                                                <input type="hidden" name="amount" value="180.00" />
                                                <button type="submit" class="chr-cart pchr-cart">
                                                    <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                                    Add to cart
                                                </button>

                                                <a href="#" data-toggle="modal" data-target="#myModal1"></a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>

                            </div>
                        </div>

                    </div> */}
                    <Footer />
                </div>
            </body>

        </>
    )
}
export default SingleBook