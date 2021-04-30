export function HomeProducts(props) {
    return(
        <div className="home-product">
            <img src={props.imgLink} className="product-img" />
            <span> {props.title} </span>
            <span> {props.starRating} </span>
            <span className="price"> {props.price} </span>
        </div>
    );
}