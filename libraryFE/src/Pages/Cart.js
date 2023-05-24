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

const Product = ( props ) =>
{

    const handleSubmit = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/" + `${ props.order.id }`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": props.order } )
        } )
        var data = await resp.text()
        if ( resp.ok )
        {
            window.location.href = "/cart"
        }
        else
        {
            alert( data )
        }
    }
    const deleteOrder = ( id ) =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( "Bạn chắc chắn muốn xoá đơn hàng này?" ) )
        {
            fetch( "http://localhost:8080/api/BuyAndBorrow/" + `${ id }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${ token }`
                },
            } )
                .then( response => response.text() )
                .then( data =>
                {
                    window.location.href = "/cart"
                } )
                .catch( error => console.error( error ) )
        }
    }
    return (
        <>
            <tr class="rem1">
                <td class="invert">{ props.order.id }</td>
                <td class="invert-image">
                    <a>
                        <img src={ props.order.book.bookImage } alt=" " class="img-responsive" />
                    </a>
                </td>
                <td class="invert">{ props.order.book.bookName }</td>
                <td class="invert">
                    { props.order.book.bookAuthor }
                </td>

                <td class="invert">${ props.order.price }</td>
                <td class="invert">{ props.order.options === 'buy' ? 'Mua' : 'Mượn' }</td>
                {
                    props.option === 'borrow' && (
                        <>
                            <td class="invert">
                                <input type="date" name="" value={ props.order.receiveDate } disabled />

                            </td>
                            <td class="invert">
                                <input type="date" name="" value={ props.order.returnDate } disabled />
                            </td>
                        </>
                    )
                }


                <td class="invert">
                    {
                        props.order.buy === 1 ? (
                            <>
                                ...Đang xử lí
                            </>
                        ) : (
                            <>
                                {
                                    props.order.buy === 2 ? <>
                                        {
                                            props.order.options === "buy" ? 'Đơn hàng đã được giao tới bạn' : 'Đang mượn'
                                        }
                                    </> : ''
                                }
                                {
                                    props.order.buy === 3 ? <>
                                        {
                                            props.order.options === "buy" ? 'Đơn hàng đã được giao tới bạn' : 'Đã trả'
                                        }
                                    </> : ''
                                }
                            </>
                        )
                    }

                </td >
                <td class="invert">
                    {
                        props.order.buy === 0 && (
                            <>

                                <div class="rem">
                                    <button type="" className="btn btn-success"
                                        onClick={ () =>
                                        {
                                            props.setView( true )
                                            props.setBill( props.order )
                                        } }
                                    >
                                        {
                                            props.order.options === 'buy' ? 'Mua hàng' : 'Mượn sách'
                                        }
                                    </button>
                                    { ' ' }
                                    <button type="" className="btn btn-danger"
                                        onClick={ () => deleteOrder( props.order.id ) }
                                    >Xoá</button>
                                </div>
                            </>
                        )
                    }

                    {
                        props.order.options === 'borrow' && props.order.buy === 2 && (
                            <>

                                <div class="rem">
                                    <button type="" className="btn btn-success"
                                        onClick={ () => handleSubmit() }
                                    >Trả sách</button>
                                </div>
                            </>
                        )
                    }


                </td >
            </tr >
        </>
    )
}

const ListOrder = ( props ) =>
{
    const [ option, setOption ] = useState( 'buy' )
    const [ orders, setOrders ] = useState( [] )

    useEffect(
        () =>
        {
            const fetchData = async () =>
            {
                var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/listOfUser", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                } )
                var data = await resp.json()
                setOrders( data )
            }
            fetchData()
        }, []
    )
    console.log( orders )
    return (
        <>
            <div class="color-quality">
                <div class="color-quality-right">
                    <select id="country1" className="form-control"
                        onChange={ ( e ) => setOption( e.target.value ) }
                    >
                        <option value="buy">Sách mua</option>
                        <option value="borrow">Sách mượn</option>
                    </select>
                </div>
            </div>
            <div class="checkout-right">

                <table class="timetable_sub table-responsive">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sản phẩm</th>
                            <th>Tên Sách</th>
                            <th>Tác giả</th>
                            <th>Giá</th>
                            <th>Hình thức</th>
                            {
                                option === 'borrow' && (
                                    <>
                                        <th>Ngày mượn</th>
                                        <th>Ngày trả</th>
                                    </>
                                )
                            }
                            <th>Tình trạng</th>
                            <th>Lựa chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders
                                .filter( item =>
                                {
                                    return ( item.options === option )
                                } )
                                .map(
                                    ( order ) => (
                                        <Product
                                            orderId={ order.id }
                                            order={ order }
                                            setView={ props.setView }
                                            customUser={ props.customUser }
                                            option={ option }
                                            setBill={ props.setBill }
                                        />
                                    )
                                )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
const SingleOrder = ( props ) =>
{

    // console.log( 123456789 )
    const handleSubmit = async () =>
    {
        var resp = await fetch( "http://localhost:8080/api/BuyAndBorrow/" + `${ props.bill.id }`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { "order": props.bill } )
        } )
        var data = await resp.text()
        if ( resp.ok )
        {
            window.location.href = "/cart"
        }
        else
        {
            alert( data )
        }
    }
    useEffect(
        () =>
        {
            console.log( props.bill )
        }, [ props.bill ]
    )
    // console.log( props.props.bill )
    return (
        <>
            <div className="fpassword">
                <button className="btn btn-dark"
                    onClick={ () =>
                    {
                        props.setView( false )
                        props.setOrderId( 0 )
                    } }
                >x</button>
            </div>
            <br />
            <div class="checkout-left">
                <div class="col-md-4 checkout-left-basket">
                    <h4>Continue to basket</h4>
                    <ul>
                        <li>Sách
                            <span>{ props.bill.book.bookName } </span>
                        </li>
                        <li>Tác giả
                            <span>{ props.bill.book.bookAuthor } </span>
                        </li>
                        <li>Thể loại
                            <span>{ props.bill.book.category ? props.bill.book.category.categoryName : '' } </span>
                        </li>

                        <li>Số lượng
                            <span>
                                <div class="btn-toolbar" >
                                    <div class="btn-group mr-2" >
                                        {
                                            props.bill.options === 'buy' && <button type="button" class="btn btn-secondary"
                                                onClick={ () =>
                                                {
                                                    if ( props.bill.number === 1 )
                                                    {
                                                        alert( 'Số lượng tối thiểu là 1' )
                                                    }
                                                    else
                                                    {
                                                        props.setBill( prevData => ( { ...prevData, [ 'number' ]: props.bill.number - 1 } ) )
                                                    }
                                                } }
                                            >-</button>
                                        }

                                        <button type="button" class="btn btn-secondary">{ props.bill.number }</button>
                                        {
                                            props.bill.options === "buy" && <button type="button" class="btn btn-secondary"
                                                onClick={ () =>
                                                {
                                                    if ( props.bill.options === 'buy' )
                                                    {
                                                        if ( props.bill.number === props.bill.book.buy )
                                                        {
                                                            alert( 'Số lượng đã dạt mức tối đa' )
                                                        }
                                                        else
                                                        {
                                                            props.setBill( prevData => ( { ...prevData, [ 'number' ]: props.bill.number + 1 } ) )
                                                        }
                                                    }

                                                } }
                                            >+</button>
                                        }

                                    </div>
                                </div>
                            </span>
                        </li>
                        <li>Giá tiền
                            <span>${ props.bill.price * props.bill.number }</span>
                        </li>

                    </ul>
                    <div className="fpassword">
                        <button class="submit check_out"
                            onClick={ () =>
                            {
                                props.setBill( prevData => ( { ...prevData, [ 'buy' ]: 1 } ) )
                                handleSubmit()
                            } }
                        >
                            { props.bill.options === 'buy' ? 'Đặt hàng' : 'Gửi yêu cầu mượn sách' }
                        </button>
                    </div>
                </div>
                <div class="col-md-8 address_form">
                    <h4>Billing Address</h4>
                    <form action="payment.html" method="post" class="creditly-card-form shopf-sear-headinfo_form">
                        <div class="creditly-wrapper wrapper">
                            <div class="information-wrapper">
                                <div class="first-row form-group">
                                    {
                                        props.bill.options === 'borrow' && (
                                            <>
                                                <div class="row">
                                                    <div className="col-md-6">
                                                        <label class="control-label">Ngày mượn: </label>
                                                        <input class="billing-address-name form-control" type="date" name="name"
                                                            value={ props.bill.receiveDate }
                                                            onChange={
                                                                ( e ) => props.setBill( prevData => ( { ...prevData, [ 'receiveDate' ]: e.target.value } ) )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label class="control-label">Ngày trả: </label>
                                                        <input class="billing-address-name form-control" type="date" name="name"
                                                            value={ props.bill.returnDate }
                                                            onChange={
                                                                ( e ) => props.setBill( prevData => ( { ...prevData, [ 'returnDate' ]: e.target.value } ) )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                    <div class="controls">
                                        <label class="control-label">Tên đầy đủ: </label>
                                        <input class="billing-address-name form-control" type="text" name="name" placeholder={ props.customUser.firstName + ' ' + props.customUser.lastName } disabled />
                                    </div>
                                    <div class="card_number_grids">
                                        <div class="card_number_grid_left">
                                            <div class="controls">
                                                <label class="control-label">Số điện thoại:</label>
                                                <input class="form-control" type="text" placeholder={ props.customUser.phone } disabled />
                                            </div>
                                        </div>
                                        <div class="card_number_grid_right">
                                            <div class="controls">
                                                <label class="control-label">Địa chỉ: </label>
                                                <input class="form-control" type="text" placeholder={ props.customUser.address } disabled />
                                            </div>
                                        </div>
                                        <div class="card_number_grid_right">
                                            <div class="controls">
                                                <label class="control-label">Nơi làm việc: </label>
                                                <input class="form-control" type="text" placeholder={ props.customUser.company } disabled />
                                            </div>
                                        </div>
                                        <div class="clear"> </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </form>

                </div>

                <div class="clearfix"> </div>

            </div>
        </>
    )
}

const Cart = () =>
{
    const [ view, setView ] = useState( false )
    const [ customUser, setCustomUser ] = useState( [] )
    const [ bill, setBill ] = useState( [] )
    useEffect(
        () =>
        {
            const fetchData = async () =>
            {

                var resp = await fetch( "http://localhost:8080/api/auth/info", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                } )
                var data = await resp.json()
                setCustomUser( data )
            }
            fetchData()
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
                    <div class="innerf-pages section">
                        <div class="container">
                            <div class="privacy about">

                                {
                                    view === false ? (
                                        <ListOrder
                                            setView={ setView }
                                            customUser={ customUser }
                                            setBill={ setBill }

                                        />
                                    ) : (
                                        <SingleOrder
                                            setView={ setView }
                                            customUser={ customUser }
                                            bill={ bill }
                                            setBill={ setBill }
                                        />

                                    )
                                }

                            </div>

                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Footer />
                </div>
            </body>

        </>
    )
}
export default Cart