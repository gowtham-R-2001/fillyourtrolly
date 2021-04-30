import { HomeProducts } from "./HomeProducts";
import { Product } from "./Product";
import { Search } from "./Search";
import { ProductDisplay } from "./ProductDisplay";
import { ImageLoader } from "./helpers/ImageLoader";

export function Home() {
    const products = [
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "5 stars",
            price: "10,000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "4 stars",
            price: "4000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "4 stars",
            price: "4000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "4 stars",
            price: "4000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "4 stars",
            price: "4000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "5 stars",
            price: "2000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "4 stars",
            price: "4000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "4 stars",
            price: "4000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "4 stars",
            price: "4000 RS"
        },
        {
            imgLink: "image.png",
            title: "Air-pods from amazon becoming booming and makes the pair",
            starRating: "4 stars",
            price: "20,000 RS"
        }
    ]

    return (
        <div className="home">
            <ImageLoader src="realme.jpg" className="banner" />
            <div className="home-products">
            {
                products.map((product,key) => {
                    return (
                        <HomeProducts
                            key={key}
                            imgLink={product.imgLink}
                            title={product.title}
                            starRating={product.starRating}
                            price={product.price}
                        />
                    );
                })
            }
            </div>
            <ImageLoader src="k20.jpg" className="banner" />
        </div>
    );
}