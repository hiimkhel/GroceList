import React from 'react';

interface Item{
    id:string,
    name: string,
    image: string,
    quantity: number,
    price: number,
    onQuantityChange: (id: string, newQuantity: number) => void
    onRemoveProduct: (id: string) => void
}

const CartItem: React.FC<Item> = ({id, name, image, quantity, price, onQuantityChange, onRemoveProduct}) => {

    // Function to handle product quantity value change
    const handleIncrement = () => {
        onQuantityChange(id, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) onQuantityChange(id, quantity - 1);
    };


    return(
        <div className='flex gap-12 border border-b border-secondary h-40 w-200 p-4'>
            {/* Item Image */}
            <div>
                <img src={image}></img>
            </div>
            
            {/* Item name and quantity */}
            <div>
                <h4>
                    {name}
                </h4>

                {/* Quantity Button */}
                <div className='flex'>
                    <button onClick={handleDecrement}>-</button>
                    {/* quantity */}
                    <div>
                        {quantity}
                    </div>
                    <button onClick={handleIncrement}>+</button>
                </div>
            </div>

            {/* Delete button and item price */}
            {/* Apply align self center sa tailwind css */}
            <div className='flex items-center justify-end space-x-2'>
                {/* Delete button */}
                <button className='bg-red-500 hover:bg-red-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-2l' onClick={() => onRemoveProduct(id)}>
                    🗑 {/* temporary trash icon */}
                </button>
                <p>₱{price}</p>
            </div>
        </div>
    )
}

export default CartItem;