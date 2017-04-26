const rp = require('request-promise');
const wrap = require('co-express');
const NotificationModel = require('../model/notification');
const PurchaseModel = require('../model/purchase');
const NOTIFICATION_RECEIVE_URL = process.env.NOTIFICATION_RECEIVE_URL;

exports.receive = wrap(function * (req, res) {
	let result = yield getNotification({});
	result = result.e5Notification;
	let notification = null, purchase = null;
	for(let type in result) {
		const purchaseDetail = result[type].purchase;
		notification = {
			typeName: type,
			purchaseId: purchaseDetail.purchaseId,
			raw: JSON.stringify(result)
		};
		purchase = {
			purchaseId: purchaseDetail.purchaseId,
			email: purchaseDetail.customerData.billingContact.email,
			productId: purchaseDetail.purchaseItem.productId,
			purchaseTime: purchaseDetail.purchaseDate,
			purchaseCompleteTime: purchaseDetail.paymentCompleteDate,
			purchaseStatus: purchaseDetail.paymentStatus,
			invoiceNumber: purchaseDetail.sequentialInvoiceNo
		};
		yield NotificationModel.create(notification);
		if((yield PurchaseModel.findById(purchase.purchaseId)) === undefined) {
			yield PurchaseModel.create(purchase);
		} else {
			yield PurchaseModel.update(purchase.purchaseId, purchase);
		}
	}
	res.status(200).json(purchase);
});

function getNotification(requestBody) {
	const options = {
		method: 'POST',
		uri: NOTIFICATION_RECEIVE_URL,
		body: requestBody,
		json: true
	};
	return rp(options);
}