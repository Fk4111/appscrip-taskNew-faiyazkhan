// Yahan hum dropdown sort component banayenge
// ✅ SortDropdown Component 👇
// This component displays the "Sort By" dropdown (Recommended ▼) seen in Figma
// It will later be used to sort the product list dynamically (Price, Name, etc.)
 import { useState} from "react";
   

        export default function SortDropdown(){
            // Local state to track the current selected sort option

            const [sortOption, setSortOption] = useState("Recommended");

            // Event handler for dropdown change

            const handleSortChange = (e) => {
                const value = e.target.value;
                setSortOption(value);
                console.log("Sorting by:", value);
                // Later: hum yahan  setrigger karenge product sorting logic  
            };
return(
    <div className="sort-container">
        {/* sort dopdown */}
        <select
         id="sort-select"
         value={sortOption}
         onChange={handleSortChange}
         className="sort-select"
        >
            <option value="Recommended">Recommended</option>
             <option value="Newest">Newest First</option>
              <option value="Popular">Popular</option>
               <option value="PriceHighLow">Price: High to Low</option>
                <option value="PriceLowHigh">Price: Low to High</option>
        </select>
        
        {/* Inline Component styles here 👇 */}
         
         <style jsx>{`
         .sort-container{
         display: flex;
         align-items: center;
         gap: 8px;
         font-size: 0.95rem;
         color: #333;
         }

         .sort-label{
         font-weight: 500;
         }

         .sort-select{
         padding: 5px 8px;
         border: 1px solid #ccc;
         border-radius: 4px;
         background: #fff;
         cursor: Pointer;
         font-size: 0.9rem;
         outline: none;
         }

         .sort-select:hover{
         border-color: #ce9178;
         }

         `}

         </style>

    </div>
)

        }