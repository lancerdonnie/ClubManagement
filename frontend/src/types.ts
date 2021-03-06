export type Product = {
  createdDate: string; //Date
  id: number;
  name: string;
};

export type Organisation = {
  createdDate: string; //Date
  id: number;
  name: string;
};

export type ProductOrganisation = {
  name: string;
  organisationId: number;
  productId: number;
};

type PublicPrivate = {
  createdDate: string; //Date
  id: number;
  publicKey: string;
};

export type ProductOrganisationExtra = {
  createdDate: string; //Date
  organisation: Organisation;
  organisationId: number;
  product: Product;
  productId: number;
  publicPrivateKeys: PublicPrivate[];
};

export type License = {
  createdDate: string; //Date
  email: string;
  id: number;
  licenseKey: string;
  name: string;
  publicPrivateId: number;
  status: string;
};

type User = {
  email: string;
  id: number;
  name: string;
};

export type LoginSuccess = {
  data: { token: string; id: number; username: string };
};
