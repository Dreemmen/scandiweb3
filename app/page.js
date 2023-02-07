"use client"
import Topbar from 'app/(components)/Topbar'
import { useState, useEffect } from 'react';
import Product from 'app/(components)/Product';
import getProducts from 'pages/api/requests/getProducts';
import deleteProducts from 'pages/api/requests/deleteProducts';


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //first get cattegories (product types)
    getProducts('')
    .then(prods => {
      setProducts(prods.results);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  }
  
async function massDelete(){
  let form = document.getElementById('product_grid');
  let selected_prods = [];
  // get all form checkboxes and values into array
  products.forEach((product, index) => {
    product.select?selected_prods[index]=product.id:'';
    //while gettings checkboxes, find parent element and delete product. or somehow remove them from useState
});
  setProducts(
    (products) => products.filter((data, index) => !(data.id===selected_prods[index]))
    )// unset array element
  //filter out empty
  selected_prods = selected_prods.filter((elm ) => elm)
  //make fetch request (use function deteleProducts(url. arrayofids))
  const request = await deleteProducts('', JSON.stringify(selected_prods));
    //refresh page for new DOM
    window.location.reload();
}
  
  return (
    <main className=''>
    <Topbar>
      <div className='link'><a href="/add-product">Add</a></div>
      <div className='link delete-checkbox' onClick={massDelete}><a href="#">Mass delete</a></div>
    </Topbar>
      <form id="product_grid" action="" method="post" onSubmit={handleSubmit}>
        {products.map((product, index) =>
        <div key={index} className={("flex-box")}>
          <Product id={product.id} sku={product.sku} name={product.name} type={product.type} price={product.price} params={product.parameters_value} >
          <input  onChange={(e) => { product.select = e.target.checked; setProducts(products); }} type="checkbox" name="mass_delete[]" className="delete-checkbox" value={product.id} />
          </Product>
        </div>
        )}
      </form>
    </main>
  )
}
