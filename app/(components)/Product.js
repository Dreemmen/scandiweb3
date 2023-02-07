import { Children } from "react";

export default function Product({children, sku, name, type, price, params}){
    return (
    <>
        <div>{children}</div>
        <div><b>{sku}</b></div>
        <div>{name}</div>
        <div>{type}</div>
        <div>{price}</div>
        <div>{params}</div>
    </>
    )
}