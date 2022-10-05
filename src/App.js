import './App.css';
import { useState } from 'react';

const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function ProductRow({product}) {
  const name = product.stocked ? product.name : 
    (<span style={{color: "red"}}>{product.name}</span>);

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2"> {category} </th>
    </tr>
  )
}

function ProductTable({checked, filterText, products}) {
  const rows = []
  let lastCategory = null;

  products.forEach((product) => {
    if(filterText !== "" && product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;

    if(checked && !product.stocked) return;

    if(product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      )
    }

    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    )

    lastCategory = product.category;
  });

  return(
    <table>
      <thead>
        <tr>Name</tr>
        <tr>Price</tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  )
}

function SearchBar({checked, filterText, onClick, onFilterText}) {
  return(
    <form>
      <input 
        type="text" 
        value={filterText}  
        onChange={(e) => onFilterText(e.target.value)} 
        placeholder='Search'> 
      </input>
      <label>
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onClick(e.target.checked)}>
        </input>
        {''}
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({products}) {
  const [checked, setChecked] = useState(false);
  const [filterText, setFilterText] = useState("");

  return(
    <div>
      <SearchBar checked={checked} filterText={filterText} onClick={setChecked} onFilterText={setFilterText}></SearchBar>
      <ProductTable checked={checked} filterText={filterText} products={products}></ProductTable>
    </div>
  )
}


export default function App() {
  return <FilterableProductTable products={products} />;
}