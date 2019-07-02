export class Line_item {
  private name: string;
  private description: string;
  private images: string[];
  private amount: number;
  private currency: string;
  private quantity: number;


  constructor(name: string, description: string, images: string[], amount: number, currency: string, quantity: number) {
    this.name = name;
    this.description = description;
    this.images = images;
    this.amount = amount;
    this.currency = currency;
    this.quantity = quantity;
  }
}
