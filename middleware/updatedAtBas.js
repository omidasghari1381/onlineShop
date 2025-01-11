const basket = (next) => {
  this.updatedAt = Date.now();
  next();
};

export default basket;