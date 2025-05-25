import QueryBuilder from '../../builder/QueryBuilder';
import { ISubscriber } from './subscriber.interface';
import { Subscriber } from './subscriber.model';

// addSubscriberToDB
const addSubscriberToDB = async (payload: ISubscriber) => {
  const result = await Subscriber.create(payload);
  return result;
};

// getAllSubscribersFromDB
const getAllSubscribersFromDB = async (query: Record<string, unknown>) => {
  const subscriberQuery = new QueryBuilder(Subscriber.find(), query)
    .search(['email'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await subscriberQuery.modelQuery;
  const meta = await subscriberQuery.countTotal();

  return {
    data,
    meta,
  };
};

export const subscriberService = {
  addSubscriberToDB,
  getAllSubscribersFromDB,
};
