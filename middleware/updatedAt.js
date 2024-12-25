const product = ((next) =>{
    this.updatedAt = Date.now();
    next()
})

const basket = (next)=>{
    this.sumprice = this.items.reduce(
        (total,item)=> total + item.quantity * item.price,
        0
    );
    this.updatedAt = Date.now();
    next()
}

export default {product,basket}