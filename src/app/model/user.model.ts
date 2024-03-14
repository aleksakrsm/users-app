export type User = {
  id: number;
  firstName: string;
  lastName: string;
  adress:Adress;
  aliases:string[];
};
export type Adress = {
  town: string;
  zipcode: string;
};
