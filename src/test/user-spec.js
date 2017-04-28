const {httpServer} = require('../../index.js');
const supertest = require('supertest');
const assert = require('assert');

describe('User::', function() {
	let request;
	before(function() {
		request = supertest.agent(httpServer);
	});
	describe('login::', function() {
		it('with uername & password', function(done) {
			request.post('/user/login')
			.send({
				username: '111',
				password: '111'
			}).expect(200, done);
		});
		it('wrong password', function(done) {
			done();
		});
	});
	it('logout',function(done) {
		done();
	});
	describe('update::', function() {
		it('update with userId', function() {

		});
		it('change password', function() {

		});
	});
	it('get current user info', function() {

	});
});