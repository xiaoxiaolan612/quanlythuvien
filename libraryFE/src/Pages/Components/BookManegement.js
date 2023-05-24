import { useEffect, useState } from "react"


const token = localStorage.getItem( "token" )

const EditBook = ( props ) =>
{
    const [ categories, setCategories ] = useState( [] )
    const [ book, setBook ] = useState( [] )
    console.log( book )

    useEffect(
        () =>
        {
            fetch( "http://localhost:8080/api/category/list" )
                .then( ( response ) => response.json() )
                .then( ( data ) => setCategories( data ) )
                .catch( ( err ) => console.log( err ) );
            fetch( "http://localhost:8080/api/book/" + `${ props.id }` )
                .then( ( response ) => response.json() )
                .then( ( data ) => setBook( data ) )
                .catch( ( err ) => console.log( err ) );

        }, []
    )
    console.log( book )
    console.log( categories )
    const handleImageUpload = ( e ) =>
    {
        const file = e.target.files[ 0 ];
        const formData = new FormData()
        formData.append( "image", file )
        fetch( "http://localhost:8080/api/image/upload", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`
            },
            body: formData
        } )
            .then( ( response ) => response.text() )
            .then( ( data ) =>
            {
                console.log( data )
                setBook( prevData => ( { ...prevData, [ 'bookImage' ]: data } ) );
            } )
            .catch( ( err ) => console.log( err ) );

    }
    const handleChange = ( event ) =>
    {
        const { name, value } = event.target;
        if ( name === 'category' )
        {
            setBook( prevData => ( { ...prevData, [ name ]: JSON.parse( value ) } ) );
        }
        else
        {
            setBook( prevData => ( { ...prevData, [ name ]: value } ) );
        }
    }
    const handleSubmit = ( e ) =>
    {
        console.log(
            JSON.stringify( { "token": token, "book": book } )
        )
        fetch( "http://localhost:8080/api/book/" + `${ props.id }`, {
            method: props.id < 0 ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ token }`
            },
            body: JSON.stringify( { "book": book } )

        } )
            .then( response =>
            {
                if ( response.ok )
                {
                    // props.setEdit( false )
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
    return (
        <>
            <div className="fpassword">
                <button type="" className="btn btn-dark" onClick={ () => props.setEdit( false ) }>Back</button>
            </div>
            <br />
            <br />
            <form>
                <div class="row">
                    <div class="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Tiêu đề</label>
                                <input type="text" class="form-control" placeholder="Tiêu đề"
                                    onChange={ handleChange }
                                    name="bookName"
                                    value={ book.bookName }
                                />
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Tác giả</label>
                                <input type="text" class="form-control" placeholder="Tác giả"
                                    onChange={ handleChange }
                                    name="bookAuthor"
                                    value={ book.bookAuthor }
                                />
                            </div>
                        </div>
                        <br />
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Mô tả</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                onChange={ handleChange }
                                name="bookDescribe"
                                value={ book.bookDescribe }
                            ></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Ngày phát hành</label>
                                <input type="date" class="form-control" onChange={ handleChange }
                                    name="bookDate"
                                    value={ book.bookDate }
                                />
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Số trang</label>
                                <input type="number" class="form-control" placeholder="Số trang" onChange={ handleChange }
                                    name="pageNumber"
                                    value={ book.pageNumber }
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Thể loại</label>
                                <select
                                    className='form-control'
                                    name="category"
                                    onChange={ handleChange }
                                    value={ book.category }
                                    required
                                >
                                    <option value={ book.category }>
                                        {
                                            book.category ? book.category.categoryName : ''
                                        }
                                    </option>
                                    { categories.map( ( category ) => (
                                        <option value={ JSON.stringify( category ) }>{ category.categoryName }</option>
                                    ) ) }
                                </select>
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Giá</label>
                                <input type="number" class="form-control" placeholder="Giá" onChange={ handleChange }
                                    name="price"
                                    value={ book.price }
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Nhà xuất bản</label>
                                <input type="text" class="form-control" placeholder="Nhà xuất bản" onChange={ handleChange }
                                    name="publisher"
                                    value={ book.publisher }
                                />
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Ngôn ngữ</label>
                                <input type="text" class="form-control" placeholder="Ngôn ngữ" onChange={ handleChange }
                                    name="language"
                                    value={ book.language }
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Số lượng sách bán</label>
                                <input type="number" class="form-control" placeholder="Sách bán" onChange={ handleChange }
                                    name="buy"
                                    value={ book.buy }
                                />
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-6">
                                <label for="exampleFormControlTextarea1">Số lượng sách cho mượn</label>
                                <input type="number" class="form-control" placeholder="Sách cho mượn" onChange={ handleChange }
                                    name="borrow"
                                    value={ book.borrow }
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div className="row">
                            <center>
                                <label for="upload" class="btn btn-success">Upload</label> <br />
                                <input type="file" id="upload" class="d-none" onChange={ handleImageUpload } />
                            </center>
                        </div>
                        <br />
                        <div className="row">
                            <center>
                                <img id="previewImage" src={ book.bookImage } style={ { maxWidth: "250px" } } />
                            </center>
                        </div>
                    </div>
                </div>
                <div className="fpassword">
                    <button class="btn btn-info" onClick={ () => handleSubmit() }>Save</button>
                </div>
                <br />
            </form>
        </>
    )
}


const ShowBook = ( props ) =>
{
    const [ books, setBooks ] = useState( [] )
    const [ bookSearch, setBookSearch ] = useState( [] )
    const [ categories, setCategories ] = useState( [] )

    const check = ( book ) =>
    {
        const keys = [ 'bookName', 'bookAuthor', 'publisher' ]
        return keys.every(
            key => (
                ( book.hasOwnProperty( key ) && ( book[ key ] === bookSearch[ key ] || book[ key ].includes( bookSearch[ key ] ) || bookSearch[ key ] == null ) )
            )
        ) && ( bookSearch.category === null || book.category &&  book.category.categoryName === bookSearch.category.categoryName )
    }

    const getList = () =>
    {
        fetch( "http://localhost:8080/api/book/-1" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setBookSearch( data ) )
            .catch( ( err ) => console.log( err ) );
        fetch( "http://localhost:8080/api/book/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setBooks( data ) )
            .catch( ( err ) => console.log( err ) );
        fetch( "http://localhost:8080/api/category/list" )
            .then( ( response ) => response.json() )
            .then( ( data ) => setCategories( data ) )
            .catch( ( err ) => console.log( err ) );

    }
    const handleChange = ( event ) =>
    {
        const { name, value } = event.target;
        if ( name === 'category' )
        {
            setBookSearch( prevData => ( { ...prevData, [ name ]: JSON.parse( value ) } ) );
        }
        else
        {
            setBookSearch( prevData => ( { ...prevData, [ name ]: value } ) );
        }
    }
    useEffect(
        () =>
        {
            getList()

        }, []
    )
    const deleteBook = ( id ) =>
    {
        // eslint-disable-next-line no-restricted-globals
        if ( confirm( "Bạn chắc chắn muốn xoá sách này?" ) )
        {
            fetch( "http://localhost:8080/api/book/" + `${ id }`, {
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
    useEffect(
        () =>
        {
            console.log( bookSearch )
        }, [ bookSearch ]
    )
    console.log( books )
    return (
        <>


            <div className="fpassword">
                <button type="" className="btn btn-info" onClick={ () =>
                {
                    props.setId( -1 )
                    props.setEdit( true )
                } }>+</button>
            </div>
            <br />
            <br />

            <form>
                <div class="row">
                    <div class="col-md-12">
                        <div className="row">
                            <div className="col-md-3">
                                <label for="exampleFormControlTextarea1">Tiêu đề</label>
                                <input type="text" class="form-control" placeholder="Tiêu đề"
                                    onChange={ handleChange }
                                    name="bookName"
                                    value={ bookSearch.bookName }
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="exampleFormControlTextarea1">Tác giả</label>
                                <input type="text" class="form-control" placeholder="Tác giả"
                                    onChange={ handleChange }
                                    name="bookAuthor"
                                    value={ bookSearch.bookAuthor }
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="exampleFormControlTextarea1">Thể loại</label>
                                <select
                                    className='form-control'
                                    name="category"
                                    onChange={ handleChange }
                                    key={ bookSearch.category ? bookSearch.category.categoryName : '' }
                                    value={ bookSearch.category }
                                    required
                                >
                                    <option>
                                        { bookSearch.category ? bookSearch.category.categoryName : '' }
                                    </option>
                                    <option value={ JSON.stringify( null ) }>
                                        Tất cả
                                    </option>
                                    { categories
                                        .filter(
                                            category =>
                                            {
                                                return bookSearch.category === null || (bookSearch.category && category.categoryName != bookSearch.category.categoryName)
                                            }
                                        )
                                        .map( ( category ) => (
                                            <option value={ JSON.stringify( category ) }>{ category.categoryName }</option>
                                        ) ) }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label for="exampleFormControlTextarea1">Nhà xuất bản</label>
                                <input type="text" class="form-control" placeholder="Nhà xuất bản" onChange={ handleChange }
                                    name="publisher"
                                    value={ bookSearch.publisher }
                                />
                            </div>

                        </div>
                        <br />
                    </div>
                </div>
                {/* <div className="fpassword">
                    <button class="btn btn-info" onClick={ () => handleSubmit() }>Save</button>
                </div> */}
                <br />
            </form>
            <table class="timetable_sub table-responsive">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sản Phẩm</th>

                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Thể loại</th>
                        <th>Nhà xuất bản</th>
                        <th>Ngày phát hành</th>
                        <th>Giá</th>
                        <th>Số trang</th>
                        <th>Số lượng còn lại(Mua)</th>
                        <th>Số lượng còn lại(Mượn)</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books
                            .filter(
                                book =>
                                {
                                    return check( book )
                                }
                            )
                            .map(
                                ( book ) => (
                                    <>
                                        <tr class="rem1">
                                            <td class="invert">{ book.bookID }</td>
                                            <td class="invert-image">
                                                <a>
                                                    <img src={ book.bookImage } alt=" " class="img-responsive" />
                                                </a>
                                            </td>

                                            <td class="invert">{ book.bookName }</td>
                                            <td class="invert">{ book.bookAuthor }</td>
                                            <td class="invert">{ book.category.categoryName }</td>
                                            <td class="invert">
                                                { book.publisher }
                                            </td>
                                            <td class="invert">
                                                <input type="date" name="" value={ book.bookDate } disabled />
                                            </td>
                                            <td class="invert">{ book.price }</td>
                                            <td class="invert">{ book.pageNumber }</td>
                                            <td class="invert">{ book.buy }</td>
                                            <td class="invert">{ book.borrow }</td>


                                            <td class="invert">
                                                <button type="" className="btn btn-success btn-sm"
                                                    onClick={ () =>
                                                    {
                                                        props.setEdit( true )
                                                        props.setId( book.bookID )
                                                    } }
                                                >Xem</button>
                                                <button type="" className="btn btn-danger btn-sm"
                                                    onClick={ () =>
                                                    {
                                                        deleteBook( book.bookID )
                                                    } }
                                                >Xoá</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            )
                    }
                </tbody>
            </table>
        </>
    )
}

const BookManegament = () =>
{
    const [ edit, setEdit ] = useState( false )
    const [ id, setId ] = useState( -1 )
    return (
        <>
            <div className="left-ads-display col-md-10">
                <div className="wrapper_top_shop">
                    <div className="product-sec1">
                        <div className="col-md-12 product-men">
                            <div className="product-chr-info chr">
                                {
                                    edit ? (
                                        <EditBook
                                            setEdit={ setEdit }
                                            id={ id }
                                            setId={ setId }
                                        />
                                    ) : (
                                        <ShowBook
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
                    <div className="clearfix"></div>
                </div>
                <br /><br /><br /><br /><br /><br />

            </div>
        </>
    )
}
export default BookManegament