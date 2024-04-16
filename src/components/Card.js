import React from 'react'

export default function Card({deal}) {
    return (
    <div className='card'>
        {
            deal ? (
                    <>
                        <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
                            <h5>{deal.title.slice(0, 20)}...</h5>
                            <p>Price: ${deal.price}</p>
                            <p style={{textDecoration: 'line-through'}}>Original Price: @{deal.price_strikethrough}</p>
                            <p style={{fontWeight: 'bold'}}>Discount: {((deal.price/deal.price_strikethrough - 1) * -100).toFixed(2)}% OFF!!</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: "flex-start"}}>
                            <img src={deal.url_image} height="100px" width={90}/>
                            <a href={`https://www.amazon.com${deal.url}`} className='buy-btn' target="_blank">Buy Now</a>
                        </div>
                    </>
             ) : null
        }
    </div>
  )
}
