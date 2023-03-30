import React from 'react'
import cartEmptyImg from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

const CartEmpty = () => {
    return (
        <>
            <div class="cart cart--empty">
            <h2>Корзина порожня 😕</h2>
            <p>
            Найімовірніше, ви не замовляли ще піцу.<br/>
            Щоб замовити піцу, перейдіть на головну сторінку.
            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link to="/" class="button button--black">
            <span>Повернутися назад</span>
            </Link>
            </div>
        </>
    
)
};

export default CartEmpty;

