export default function ProductCard({ product }){
    return (
        <div className="card">
            <img src={product.image} alt={product.title}/>
            <h3>{product.title}</h3>
            <p> ₹{product.price} </p>

            <style jsx>{`
            .card {
            border: 1px solic #ccc;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            background: #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            }

            .card img{
            width: 150px;
            height: 150px;
            object-fit: contain;
            }
            `}
             </style>

        </div>
    );
}