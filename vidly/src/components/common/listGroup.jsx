import React from "react";

const ListGroup = (props) => {
    const {items, textProperty, valueProperty, selectedItem, onItemSelect} = props;
    return (
        <ul className="list-group">
            {items.map(item => (
                <li key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                    className={item === selectedItem ? 'list-group-item pointer active ' : 'list-group-item pointer'}>{item[textProperty]}</li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
}

export default ListGroup;