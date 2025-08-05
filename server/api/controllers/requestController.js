const requestServices = require('../services/requestService');

exports.createRequest = async (req, res) => {
    try {
        const requestDetails = req.body;
        const requests = await requestServices.createrequest(requestDetails);
        res.status(201).json({Message:"Request Sent", requests});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getRequests = async (req,res) => {
    try {
        const requests = await requestServices.getRequests();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getRequestById = async (req, res) => {
    try {
        const reqId = req.params.reqId;

        const requests = await requestServices.getRequestById(reqId);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getRequestsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const requests = await requestServices.getRequestsByUser(userId);
        res.status(200).json({data:requests, message:"Data collected"});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getRequestsByReciever = async (req, res) => {
    try {
        const userId = req.params.userId;

        const requests = await requestServices.getRequestsByReciever(userId);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.editRequests = async (req, res) => {
    try {
        const reqId = req.params.reqId;
        const data = req.body;

        const requests = await requestServices.editRequestById(reqId, data);
        res.status(200).json({data:requests, Message:"request updated!"});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleterequests = async (req, res) => {
    try {
        const reqId = req.params.reqId;

        const requests = await requestServices.deleteRequestById(reqId); 
    } catch (error) {
        res.status(500).json(error);
    }
}

