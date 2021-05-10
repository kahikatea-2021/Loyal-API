const request = require('supertest')

const server = require('../server')
const db = require('../db/store')

jest.mock('../db/store')

describe('GET /api/v1/stores', () => {
	it('responds with stores on res body', () => {
		db.getStores.mockImplementation(() => Promise.resolve(
			[{
				id: 1,
				store_name: 'Cracking Coffee',
				admin_first_name: 'Crack',
				admin_last_name: 'Coffee',
				email: 'crackincoffe@coffee.com',
				phone: 23456789,
				address: '2 Coffee Crescent, Coffeeville, Beans, 1020', 
			},
			{
				id: 2,
				store_name: 'Brew Coffee',
				admin_first_name: 'Brew',
				admin_last_name: 'Coffee',
				email: 'brewcoffe@coffee.com',
				phone: 54326789,
				address: '5 Brew Crescent, Brewville, Beans, 1200',  
			}]
		))
		return request(server)
			.get('api/v1/stores')
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body.store).toHaveLength(2)
				return null
			})
	})
})

it('responds with 500 and correct error object on DB error', () => {
	db.getStores.mockImplementation(() => Promise.reject(
		new Error('mock getStores error')
	))
	return request(server)
		.get('/api/v1/stores')
		.expect('Content-Type', /json/)
		.expect(500)
		.then(res => {
			expect(res.body.error.title).toBe('Unable to retrieve stores')
			return null
		})
})
