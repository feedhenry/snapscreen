var baseUrl = 'http://localhost:8080/auth';

module.exports = {
  registration: {
    endpoint: baseUrl + '/realms/test/clients-registrations',
    accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCIgOiAibGpfS2RFTUdFd1F5eFJwcXNJZk1OV1R2Zlk3NHFUZ3hsSm10SGVCaVJ2byJ9.eyJqdGkiOiI2MzdhYzljMi00MTg0LTRkOTItOGU4NC1mMDczNjFiN2YyZWIiLCJleHAiOjAsIm5iZiI6MCwiaWF0IjoxNDkyNzYxMzYyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvdGVzdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hdXRoL3JlYWxtcy90ZXN0IiwidHlwIjoiUmVnaXN0cmF0aW9uQWNjZXNzVG9rZW4iLCJyZWdpc3RyYXRpb25fYXV0aCI6ImF1dGhlbnRpY2F0ZWQifQ.H8TNY76Uq2lWlI6JgzcZmPenIFa3ZbDSekPezSuQd2jIl36pcDELqn1gpKVTPTWf7K-hgsVd0jmE19SkQU4m8B6q0KnbsvxD9IJUPgN5Jq95I7lESj1XfZrZ2tCzaqBv89vlue-OLFOCE4vt7i38Uw-Qy0m7AuG8hi9hP4cSCh8DO1APCBc8dIe-iPplO0thLaG2Rk2awMg0-9xyplykW-BF2sFPuocMpEmgwK29cgJ18I4YWOhcOA-T7p2W0REtK1ewvQxzjedz6-icXs8UBRYj-DXRTyaRcgjsbQqi3H_jeyv0niZTRvn0FWhL5XQGt5srmDMDu5Va8CaduKGE_g'
  },
  baseUrl: baseUrl,
  token: {
    username: 'test@test.com',
    password: 'test',
    grant_type: 'password',
    client_id: 'snapscreen',
    realmName: 'test'
  },
  testClient: {
    clientId: 'snapscreen',
    consentRequired: "false",
    publicClient: "true",
    standardFlowEnabled: "false",
    directAccessGrantsEnabled: "true",
    fullScopeAllowed: "true"
  }
};



