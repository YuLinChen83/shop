import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from 'redux/cart/actions';
import { ReactComponent as ShoppingIcon } from 'assets/shopping-bag.svg';
import { selectCartItemsCount } from 'redux/cart/selectors';
import './index.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

const mapDispatchToProps = { toggleCartHidden };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
