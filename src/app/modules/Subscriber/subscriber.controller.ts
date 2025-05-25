import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { subscriberService } from './subscriber.service';

// addSubscriber
const addSubscriber = catchAsync(async (req, res) => {
  const result = await subscriberService.addSubscriberToDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'You have successfully subscribed! 🎉',
    data: result,
  });
});

// getAllSubscribers
const getAllSubscribers = catchAsync(async (req, res) => {
  const result = await subscriberService.getAllSubscribersFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All subscribers are retrieved successfully!',
    data: result.data,
    meta: result.meta,
  });
});

export const subscriberController = {
  addSubscriber,
  getAllSubscribers,
};
