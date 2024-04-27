import React from 'react'

export default function ProductsCard({ product }) {
    return (
        <div className='col-sm-4 mb-5'>
            <div className="card" style={{ 'width': '22.5rem' }}>
                <img src={product?.image} className="card-img-top" style={{ 'cursor': 'pointer', height:'250px' }} alt={'test'} />
                <div className="card-body">
                    <h5 className="card-title" style={{ fontSize:'20px', fontWeight: 600 }}>{product?.name}</h5>
                    <p className="card-text"><span style={{ fontWeight: 600 }}>Category: {product?.category}</span></p>
                    <p className="card-text"><span style={{ fontWeight: 600 }}>Color: {product?.color}</span></p>
                    <p className="card-text"><span style={{ fontWeight: 600 }}>Brand: {product?.brand}</span></p>
                </div>
            </div>
        </div>
    )
}
