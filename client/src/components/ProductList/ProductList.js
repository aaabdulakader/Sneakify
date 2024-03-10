import React from 'react'; 

 import productListStyles from './ProductList.module.css';

 

function ProductList() {
    return (
        <div>
            {/* ProductList component */}
            <h1 className={productListStyles.title}>Product List</h1>
        </div>
    );
}

export default ProductList;
