var baseUrl = 'http://localhost:8080/auth';

module.exports = {
  registration: {
    endpoint: baseUrl + '/realms/test/clients-registrations',
    //generate initial access token , this will create a client, Test won't create the same client more that once
    accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCIgOiAibGpfS2RFTUdFd1F5eFJwcXNJZk1OV1R2Zlk3NHFUZ3hsSm10SGVCaVJ2byJ9.eyJqdGkiOiJkMGMwMjViYS1mYjMzLTRhNjUtODk1Ny1lMzU5MjgxYTk5N2QiLCJleHAiOjAsIm5iZiI6MCwiaWF0IjoxNDkyNzc0ODA4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvdGVzdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hdXRoL3JlYWxtcy90ZXN0IiwidHlwIjoiUmVnaXN0cmF0aW9uQWNjZXNzVG9rZW4iLCJyZWdpc3RyYXRpb25fYXV0aCI6ImF1dGhlbnRpY2F0ZWQifQ.Qeku6z4XTjGbNUkWDEu8uiM2uHlJ-p5a3UmaiaSa7J4e4cZkXOTnkKkTMeHIMmVSLFLUGYXFfxtbKWyphKHojD0Z5snD6Ma6mxY20Ki3a7fmNFnP2uaC3oBomTw4BDg-OlONj6ExLZR610XVZ6Ik_p55cAWIDmvx-Bh6LcdUTemX0ytu3_ggANeS_bBSRbh6uAgUxD0at8gSLi2Nl2UzC6O1DjhVnngs5L6H6wwtQR2aeWZM1yWhdnzQPAsPhcNCYDO-N_0LA86gbF63_4_ykzSEqLWSjU1yxstZEkZJCVkslb76c38Z81ukjl9qNUkmWj1WotZKragKdf-J-TxAMw'
  },
  baseUrl: baseUrl,
  token: {
    username: 'test@test.com',
    password: 'test',
    grant_type: 'password',
    client_id: 'test-client',
    realmName: 'test'
  },
  testClient: {
    clientId: 'test-client',
    consentRequired: "false",
    publicClient: "true",
    standardFlowEnabled: "false",
    directAccessGrantsEnabled: "true",
    fullScopeAllowed: "true"
  }
};



