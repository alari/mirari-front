import expect from 'expect'
import apiMiddleware from './index'
import { API } from 'api/constants'
import environmental from 'environmental'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'

const mockStore = configureMockStore([apiMiddleware])

const createFakeStore = fakeData => ({
  getState() {
    return fakeData
  }
})

const dispatchWithStoreOf = (storeData, action) => {
  let dispatched = null
  const dispatch = apiMiddleware(createFakeStore(storeData))(actionAttempt => dispatched = actionAttempt)
  dispatch(action)
  return dispatched
}


describe('api middleware', function(){
  afterEach(() => {
    nock.cleanAll()
  })

  it('should take api actions and return promise', function(){
    const action = {
      type: API,
      query: '',
      types: {
        REQUEST: 'TEST_REQUEST',
        SUCCESS: 'TEST_SUCCESS',
        FAILURE: 'TEST_FAIL'
      }
    }
    const dispatch = apiMiddleware(createFakeStore({}))(actionAttempt => {})
    expect(dispatch(action)).toBeA(Promise)
  })
  it('shouldn’t take not api actions', function(){
    const action = {
      type: 'SOME TYPE',
      query: '',
      types: {
        REQUEST: 'TEST_REQUEST',
        SUCCESS: 'TEST_SUCCESS',
        FAILURE: 'TEST_FAIL'
      }
    }
    expect(dispatchWithStoreOf({}, action)).toBe(action)
  })

  it('should create a request and dispatch success when everything is fine', function(done){
    let config = environmental.config()
    nock(__REQUEST_API_ENDPOINT__)
      .get('/url')
      .reply(200, { data: true })


    const action = {
      type: API,
      url: '/url',
      method: 'GET',
      types: {
        REQUEST: 'TEST_REQUEST',
        SUCCESS: 'TEST_SUCCESS',
        FAILURE: 'TEST_FAIL'
      }
    }

    const expectedActions = [
      {
        type: 'TEST_REQUEST',
        url: '/url',
        method: 'GET',
        types: {
          REQUEST: 'TEST_REQUEST',
          SUCCESS: 'TEST_SUCCESS',
          FAILURE: 'TEST_FAIL'
        }
      }, {
        type: 'TEST_SUCCESS',
        result: {
          body: { data: true },
          headers: { 'content-type': 'application/json' },
          status: 200
        },
        url: '/url',
        method: 'GET',
        types: {
          REQUEST: 'TEST_REQUEST',
          SUCCESS: 'TEST_SUCCESS',
          FAILURE: 'TEST_FAIL'
        }
      }
    ]
    const store = mockStore({}, expectedActions, done)
    store.dispatch(action)
  })
  it('should dispatch fail action when done with errors', function(done){
    let config = environmental.config()
    nock(__REQUEST_API_ENDPOINT__)
      .get('/url')
      .reply(500, { data: true })


    const action = {
      type: API,
      url: '/url',
      method: 'GET',
      types: {
        REQUEST: 'TEST_REQUEST',
        SUCCESS: 'TEST_SUCCESS',
        FAILURE: 'TEST_FAIL'
      }
    }

    const expectedActions = [
      {
        type: 'TEST_REQUEST',
        url: '/url',
        method: 'GET',
        types: {
          REQUEST: 'TEST_REQUEST',
          SUCCESS: 'TEST_SUCCESS',
          FAILURE: 'TEST_FAIL'
        }
      }, {
        url: '/url',
        method: 'GET',
        type: "TEST_FAIL",
        error: {
          error: "Error: Internal Server Error",
          status: 500
        },
        types: {
          REQUEST: 'TEST_REQUEST',
          SUCCESS: 'TEST_SUCCESS',
          FAILURE: 'TEST_FAIL'
        }
      }
    ]
    const store = mockStore({}, expectedActions, done)
    store.dispatch(action)
  })
})
