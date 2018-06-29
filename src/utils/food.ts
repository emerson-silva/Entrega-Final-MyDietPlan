export class Food {
    id: number;
    name: string;
    description: Text;
    carb: number;
    protein: number;
    fat: number;
    stockLevel: number;
    recommendedStockLevel: number;

    constructor(id: number, name: string, carb: number, protein: number, fat: number, description: Text, stockLevel: number, recommendedStockLevel: number) {
        this.id = id;
        this.name = name;
        this.carb = carb;
        this.protein = protein;
        this.fat = fat;
        this.description = description;
        this.stockLevel = stockLevel;
        this.recommendedStockLevel = recommendedStockLevel;
    }
}