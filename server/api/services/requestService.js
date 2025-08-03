const FriendRequest = require("../models/friendrequests");

exports.createrequest = async (requestDetails) => {
  try {
    const requests = new FriendRequest(requestDetails);
    return await requests.save();
  } catch (error) {
    throw new Error(error);
  }
};

exports.getRequests = async () => {
  try {
    return await FriendRequest.find();
  } catch (error) {
    throw new Error("data does not exist!");
  }
};

exports.getRequestsByUser = async (userId) => {
  try {
    const requests = await FriendRequest.find({
      from: userId,
    });
    return requests;
  } catch (error) {
    throw new Error("data does not exist!");
  }
};

exports.getRequestById = async (reqId) => {
  try {
    const requests = await FriendRequest.findById(reqId);

    return requests;
  } catch (error) {
    throw new Error("data does not exist!");
  }
};

exports.editRequestById = async (reqId, requestDetails) => {
  try {
    const requests = await FriendRequest.findByIdAndUpdate(
      reqId,
      requestDetails
    );

    return requests;
  } catch (error) {
    throw new Error("data does not exist!");
  }
};

exports.deleteRequestById = async (reqId) => {
    try {
        const requests = await FriendRequest.findByIdAndDelete(
            reqId
          );
      
          return requests;
    } catch (error) {
        throw new Error(error);
    }
}
