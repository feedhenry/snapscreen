/**
 * Created by acunningham on 21/04/17.
 */
'use strict';

const config = require('./config');
const test = require('tape');
const roi = require('roi');
const registration = require('keycloak-client-registration');
const tokenRequester = require('keycloak-request-token');


test('Should test public route with no credentials.', t => {
  const options = {
    'endpoint': 'http://localhost:3000/test2'
  };

roi.get(options)
    .then(x => {
                t.equal(JSON.parse(x.body).message, 'test2');
                t.end();
    })
    .catch(e => {
                console.error(e);
                t.fail();
    });
});

test('Should test secured route with no credentials.', t => {
  const options = {
                  'endpoint': 'http://localhost:3000/test'
  };

roi.get(options)
    .then(x => {
                t.fail('Should never reach this block');
    })
    .catch(e => {
                t.equal(e.toString(), 'Access denied');
                t.end();
    });
});


registration.create(config.registration, config.testClient).then((v) => {
  config.registration.accessToken = v.registrationAccessToken;

  test('Should test secured route with user credentials.', t => {
    tokenRequester(config.baseUrl, config.token).then((token) => {
    var opt = {
      endpoint: 'http://localhost:3000/test',
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    console.log(opt);
  roi.get(opt)
      .then(x => {
                  t.equal(JSON.parse(x.body).message, 'secured');
                  t.end();
      })
      .catch(e => t.fail(e));

      }).catch((err) => {
                        console.log('err', err);
      });
  });
}).catch((e) => {
  console.error('Error creating client. Please, check if you have accessToken properly configured', e);
});