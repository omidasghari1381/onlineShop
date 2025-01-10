const basket = (next) => {
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  this.updatedAt = Date.now();
  next();
};

export default basket;