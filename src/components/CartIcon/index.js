import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from 'redux/cart/actions';
import { ReactComponent as ShoppingIcon } from 'assets/shopping-bag.svg';
import { selectCartItemsCount } from 'redux/cart/selectors';
import './index.scss';

const CartIcon = ({ toggleCartHidden }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>0</span>
  </div>
);

const mapStateToProps = state => ({
  itemCount: selectCartItemsCount(state),
});

const mapDispatchToProps = { toggleCartHidden };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
