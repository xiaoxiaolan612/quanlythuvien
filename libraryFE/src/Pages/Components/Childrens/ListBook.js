import { useEffect, useState } from "react";



const ListBook = ( props ) =>
{
    const [ books, setBooks ] = useState( [] )
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
    return (
        <>
            {
                books
                    .filter(
                        book =>
                        {
                            return book.bookName.toLowerCase().includes( props.keyword.toLowerCase() ) &&
                                ( props.categoryList.length === 0 || props.categoryList.includes( 'All' ) || props.categoryList.includes( book.category.categoryName ) ) &&
                                book.bookAuthor.toLowerCase().includes( props.author.toLowerCase() )
                        }
                    ).map(
                        ( book ) => (
                            <div className="col-md-3 product-men">
                                <div className="product-chr-info chr">
                                    <div className="thumbnail">
                                        <a onClick={ () =>
                                        {
                                            localStorage.setItem( "bookID", book.bookID )
                                            window.location.href = "/book"
                                        } }>
                                            <img src={ book.bookImage } alt="" style={ { maxWidth: "164px" } } />
                                        </a>
                                    </div>
                                    <div className="caption">
                                        <h4>{ book.category.categoryName }</h4>
                                        <p>{ book.bookName }</p>
                                        <div className="matrlf-mid">
                                            <ul className="rating">
                                                <li>
                                                    <a href="/">
                                                        <span className="fa fa-star yellow-star"
                                                            aria-hidden="true"></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        <span className="fa fa-star yellow-star"
                                                            aria-hidden="true"></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        <span className="fa fa-star yellow-star"
                                                            aria-hidden="true"></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        <span className="fa fa-star yellow-star"
                                                            aria-hidden="true"></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        <span className="fa fa-star gray-star"
                                                            aria-hidden="true"></span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul className="price-list">
                                                {
                                                    props.customUser.roles === 'MEMBER' || props.customUser.roles === 'ADMIN' ? (
                                                        <>
                                                            <li>${ parseInt(book.price * 0.7) }</li>
                                                            <li>
                                                                ${ book.price }
                                                            </li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li>
                                                                ${ book.price }
                                                            </li>
                                                            <li></li>
                                                        </>
                                                    )
                                                }
                                            </ul>

                                            <div className="clearfix"> </div>
                                        </div>
                                        {/* <form action="/" method="post">
                                                    <input type="hidden" name="cmd" value="_cart" />
                                                    <input type="hidden" name="add" value="1" />
                                                    <input type="hidden" name="chr_item" value="Book11" />
                                                    <input type="hidden" name="amount" value="280.00" />
                                                    <button type="submit" className="chr-cart pchr-cart">Add to cart
                                                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                                    </button>
                                                    <a href="/" data-toggle="modal" data-target="/myModal1"></a>
                                                </form> */}
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        )
                    )
            }
            <div className="clearfix"></div>
        </>
    )
}
export default ListBook