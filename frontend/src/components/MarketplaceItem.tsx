//item card for each item in market place
import React from 'react';
import Button from './Button';

interface ItemProps{
    id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    quantity: number,
    onAddToCart?: (id: string) => void;
}

const MarketplaceItem: React.FC<ItemProps> = ({id, name, description, price, imageUrl, quantity, onAddToCart}) => {
    return(
        
        <div className='h-100 flex flex-col items-center p-4 border-2 border-secondary rounded-3xl '> {/* Item card */}
            <img src={imageUrl} alt={name}   className="object-cover w-[150px] h-[150px] rounded-lg mb-2"></img>
            <p>{name}</p>
            {/* Price and Quantity */}
            <div className='flex gap-2'>
                <p>${price.toFixed(2)}</p>
                {/* Check stock if available */}
                {
                    quantity ? (<>
                    {/* Display green if available */}
                        <div className='bg-green'>
                            <p>In stock: {quantity}</p>
                        </div>
                    </>) : (<>
                    {/* Display red if not available */}
                    <div className='bg-gray'>
                        <p>In stock: 0</p>
                    </div></>)
                }
            </div>
            {/* Description (lighter text color) */}
            <p>{description}</p>
            {/* Add to Cart Button */}
            {onAddToCart && (
                <Button
                variant="primary"
                size="sm"
                className="mt-2"
                onClick={() => onAddToCart(id)}
                >
                Add to Cart
                </Button>
            )}
        </div>
        

    )
}

export default MarketplaceItem;