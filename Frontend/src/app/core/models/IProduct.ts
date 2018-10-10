export interface IProduct {
    Id?: number;
    ProductCode: String;
    Name: String;
    Price: number;
    PromotionPrice: Number;
    CreatedDate?: Date;
    CreatedBy?: String;
    UpdateDate?: Date;
    UpdateBy?: String;
    Status: Boolean;
    isAdded ?: Boolean;
    Image: String;
    soLuong?: number;
}
