const wrap = require('co-express');
const NotificationModel = require('../model/notification');
const PurchaseModel = require('../model/purchase');

exports.receive = wrap(function * (req, res) {
	let result = req.body;
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
			yield PurchaseModel.updateById(purchase.purchaseId, purchase);
		}
	}
	res.status(200).json(purchase);
});