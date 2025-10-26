//ye Footer Component hai - will display usefull links and credits at the borrom only
// ye component har page ke neeche show krega 

export default function Footer(){
    return(
        <footer className="footer">
            <div className="footer-content">
             {/* ✅ ye left side footer hoga Abouts & links */}
              <div className="footer-section">
                <h4>
                    About AppScrip-Mart
                </h4>
                <p>
                    Your one-stop solution for stylish & affordable products.
                    I built it with ❤️ and Next.Js & fakestore API just to test my logic and ability.
                </p>
              </div>

              {/* ye section Middle - Quick links ke liye hai */}
               
               <div className="footer-section">
                   
                 <h4>Quick Links</h4>

                 <ul>
                    <li><a href="#"> Shop </a></li>
                      <li><a href="#"> Stories </a></li>
                        <li><a href="#"> About </a></li>
                          <li><a href="#"> Conatct Us</a></li>
                 </ul>
             </div>


            {/* ✅ ye section right side social links ke liye hai */}
               <div className="footer-section">

                <h4>Follow Us</h4>

                <div className="social-icons">
                    <a href="#" aria-label="Instagram"> 📸 </a>
                     <a href="#" aria-label="Twitter"> ❎ </a>
                      <a href="#" aria-label="LinkedIn"> ℹ️ </a>
                </div>
               </div>
             </div>
             
           {/* Bottom copyright line */}

           <div className="footer-bottom">
            © {new Date().getFullYear()} AppScrip-Mart. All rights reserved.
           </div>

           <style jsx>{`
           .footer{
           background-color: #cdc6c6ff;
           border-top: 1px solid #ddd;
           padding: 30px 20px;
           color: #333;
           text-align: center;
           margin-top: 40px;
           cursor: default;
           user-select: none;
           }

           .footer-content{
           display: flex;
           justify-content: space-between;
           flex-wrap: wrap;
           gap: 20px;
           max-width: 1000px;
           margin: 0 auto;
           }

           .footer-section{
           flex: 1;
           min-width: 250px;
           }

           .footer-section h4{
           color: #a65f44ff;
           margin-bottom: 10px;
           }

           .footer-section h4:hover{
           color: #333;
           }

           .footer-section p{
           font-size: 0.9rem;
           color: #666;
           cursor: default;
           user-select: none;
           }

           .footer-section ul{
           list-style: none;
           padding: 0;
           }

           .footer-section ul li{
           margin-bottom: 5px;
           }

           .footer-section a{
           color: #333;
           text-decoration: none;
           }

           .footer-section :hover{
           color: #ce9178;
           }

           .social-icona a {
           font-size: 1.3rem;
           margin-right: 10px;
           text-decoration: none;
           }

           .footer-bottom{
           margin-top: 20px;
           font-size: 0.85rem;
           color: #777;
           }

           @media (max-width: 768px){
           .footer-content{
           flex-direction: column;
           align-items: center;
           text-align: center;
           }
           }

           `}

           </style>

        </footer>
    )
}