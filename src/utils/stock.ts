export class StockItem {
    id: Number;
    unity: Text;
    quantity: Number;

    constructor(id: Number, unity: Text, quantity: Number) {
        this.id = id;
        this.unity = unity;
        this.quantity = quantity;
    }
}