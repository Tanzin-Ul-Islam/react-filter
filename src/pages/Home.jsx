import React, { useEffect, useState } from 'react'
import ProductsCard from '../components/ProductsCard'
import { productList } from "../data/data";
export default function Home() {

  const [list, setList] = useState(productList);
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filterData, setFilterData] = useState({
    category: "",
    color: [],
    brand: "",
  });
  const [searchKey, setSearchKey] = useState("");
  function handleAssignValue(e) {
    setFilterData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  function handleCheckbox(e) {
    const value = e.target.value;
    let colorArr = filterData.color;
    if (filterData.color.includes(value)) {
      colorArr = filterData.color.filter(el => (el != value));
    } else {
      colorArr.push(value);
    }
    setFilterData((prevState) => ({ ...prevState, color: colorArr }));
  }

  function clearAllFilter() {
    setFilterData({
      searchKey: "",
      category: "",
      color: [],
      brand: "",
    })
  }

  function init() {
    try {
      let scope_category = [];
      let scope_color = [];
      let scope_brand = [];
      list.map((el) => {
        scope_category.push(el.category);
        scope_color.push(el.color);
        scope_brand.push(el.brand);
        return;
      });

      setCategory([...new Set(scope_category)]);
      setColor([...new Set(scope_color)]);
      setBrand([...new Set(scope_brand)]);

    } catch (error) {
      console.log(error)
    }
  }

  function filterProducts() {
    const tempList = productList;
    const filteredList = tempList.filter(product => (
      (!filterData.category || product.category === filterData.category) &&
      (!filterData.brand || product.brand === filterData.brand) &&
      ((!filterData.color.length > 0) || filterData.color.includes(product.color))
    ))
    setList([...filteredList]);
  }

  function searchProducts() {
    let tempList = productList;
    let filteredList = []
    filteredList = tempList.filter(product => (
      !searchKey || product.name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
    ))
    filteredList.length > 0 && (tempList = filteredList)
    setList([...tempList]);

  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterData])

  useEffect(() => {
    searchProducts();
  }, [searchKey])



  return (
    <div className='mt-5'>
      <div>
        <form action="">
          <div className='w-100 mb-2'>
            <input type="search" className="form-control" id="search" placeholder="Search Product" name="searchKey" value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} />
          </div>
        </form>
      </div>
      <div className='mb-2' onClick={clearAllFilter}><span className='cursor-pointer '>clear All</span></div>
      <div className='row'>
        <div className='col-sm-2 mb-5'>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <span className="fs-6 fw-semibold">Category</span>
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {
                    category.map((el, index) => {
                      return (
                        <div className="form-check" key={el + index}>
                          <input className="form-check-input" type="radio" name="category" value={el} onChange={handleAssignValue} checked={el == filterData.category} />
                          <label className="form-check-label">
                            {el}
                          </label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <span className="fs-6 fw-semibold">Color</span>
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {
                    color.map((el, index) => {
                      return (
                        <div className="form-check" key={el + index}>
                          <input className="form-check-input" type="checkbox" name="color" value={el} onChange={handleCheckbox} checked={filterData.color.includes(el)} />
                          <label className="form-check-label">
                            {el}
                          </label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  <span className="fs-6 fw-semibold">Brand</span>
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {
                    brand.map((el, index) => {
                      return (
                        <div className="form-check" key={el + index}>
                          <input className="form-check-input" type="checkbox" name="brand" value={el} onChange={handleAssignValue} checked={el == filterData.brand} />
                          <label className="form-check-label">
                            {el}
                          </label>
                        </div>
                      )
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-10'>
          <div className='row'>
            {
              list.length > 0 ?
                list.map((el, index) => {
                  return (
                    <ProductsCard key={index} product={el} />
                  )
                }) : <>No Data Found</>
            }
          </div>
        </div>

      </div>
    </div>
  )
}
