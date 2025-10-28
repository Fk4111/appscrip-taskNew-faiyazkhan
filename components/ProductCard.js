
import Image from "next/Image";
export default function ProductCard({ product }){
    return (
        <div className="card">
            <Image src={product.image}
             alt={product.title}
             width={150}
             height={150}/>
            <h3>{product.title}</h3>
            <p> ₹{product.price} </p>

            <style jsx>{`
            .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            background: #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            }

            .card img-wrapper{
            width: 150px;
            height: 150px;
            object-fit: contain;
            }

            .card:hover{
            transform: translateY(-3px) scale(1.03); /* ye slighlt lift-up krega cards ko */
            box-shadow: 0 6px 15px rgba(0,0,0, 0.15);
            border-color: #ce9178; /* aur ye highlight krega border ko */
            }
            `}
             </style>

        </div>
    );
}