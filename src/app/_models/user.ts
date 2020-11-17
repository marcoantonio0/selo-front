export interface UserModel {
  email: string;
  password: string;
  website: string;
  name: string;
  company: string;
  status: number;
  type: number;
  place: {
      address: string;
      number: number;
      cep: number;
      city: string;
      complement: string;
      district: string;
      uf: string;
  }
  fantasy_name: string;
  rate: string | any[];
  phone: string;
  owners: [{
      name: string;
      email: string;
      phone: number;
      birthday: string;
      role: string;
      cpfcnpj: number;
  }];
  createdAt: string;
  updatedAt: string;
  audited: string;
};
