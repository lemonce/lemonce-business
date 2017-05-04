const {app} = require('../../index.js');
const supertest = require('supertest');

describe('Testing with purchase::', function() {
	let request;
	before(function() {
		request = supertest.agent(app);
	});
	describe('handle notification::', function() {
		it('orderNotification', function(done) {
			const orderNotificationJson = {
				'e5Notification': {
					'orderNotification': {
						'purchase': {
							'customerData': {
								'billingContact': {
									'address': {
										'city': 'Eden Prairie',
										'country': 'USA',
										'countryId': 'US',
										'state': 'Minnesota',
										'stateId': 'MN',
										'postalCode': '11111',
										'street1': '1111 South Road'
									},
									'email': 'daisy@tju.edu.cn', 'firstName': 'John', 'lastName': 'Walter'
								},
								'customerPaymentData': {
									'currency': 'USD',
									'paymentMethod': 'VISA'
								},
								'deliveryContact': {
									'address': {
										'city': 'Eden Prairie',
										'country': 'USA',
										'countryId': 'US',
										'state': 'Minnesota',
										'stateId': 'MN',
										'postalCode': '11111',
										'street1': '1111 South Road'
									},
									'email': 'daisy@tju.edu.cn',
									'firstName': 'John',
									'lastName': 'Walter'
								},
								'language': 'English',
								'regName': 'John Walter',
								'subscribeNewsletter': 'false'
							},
							'paymentCompleteDate': '2007-07-24T15:33:42',
							'paymentStatus': 'complete',
							'purchaseDate': '2007-07-24T15:24:40',
							'purchaseId': 279533445,
							'purchaseItem': {
								'currency': 'USD',
								'deliveryType': 'Electronically',
								'discount': 0.0,
								'extendedDownloadPrice': 0.0, 'manualOrderPrice': 0.0,
								'notificationNo': 25,
								'productId': 1,
								'productName': 'Test Product 30 days monthly', 'productSinglePrice': 1500.0,
								'quantity': 1,
								'runningNo': 1,
								'shippingPrice': 0.0,
								'shippingVatPct': 0.0,
								'subscription': {
									'interval': 'Monthly without end',
									'startDate': '2007-07-25T00:00:00'
								},
								'vatPct': 0.0
							},
							'purchaseOrigin': 'online',
							'sequentialInvoiceNo': 'e5-DE-2007-00000000000'
						}
					}
				}
			};
			request.post('/purchase')
			.send(orderNotificationJson)
			.expect(200, done);
		});
	});
});