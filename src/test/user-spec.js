const {app} = require('../../index.js');
const supertest = require('supertest');
const assert = require('assert');

describe('User::', function() {
	let request;
	before(function() {
		request = supertest.agent(app);
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

	describe('create::', function () {
		it('create user -E', function(done) {
			request.post('/user')
			.send({
				username: 'daisy1995',
				password: '111111',
				email: 'daisy@tju.edu.cn'
			})
			.expect(200, done);
		});
	});
});