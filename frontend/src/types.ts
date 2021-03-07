export type License = {
  createdDate: string; //Date
  email: string;
  id: number;
  licenseKey: string;
  name: string;
  publicPrivateId: number;
  status: string;
};

export type LoginSuccess = {
  data: { token: string; id: number; username: string };
};
