import Customer from "./customer.model";

const getAll = async () => {
  const customers = await Customer.find().populate("user");
  return customers;
};

export const customerService = {
  getAll,
};
