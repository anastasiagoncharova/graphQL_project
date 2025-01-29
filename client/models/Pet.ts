export interface Pet {
  id: string;
  name: string;
  description: string;
  gender: 'male' | 'female';
  type: 'cat' | 'dog';
  age: number;
  vaccinated: boolean;
  sterilized: boolean;
  image: string;
}
