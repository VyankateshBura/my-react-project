import React from 'react';

function ItemList({ items }) {
  const itemElements = [];
    console.log("Reached here" + items.length)
  for (let i = 0; i < items.length; i++) {
    itemElements.push(
      <div key={i} className="item">
        {items[i]}
      </div>
    );
  }

  return <div className="item-list">{itemElements}</div>;
}

export default ItemList;