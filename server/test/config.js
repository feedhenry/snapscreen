var baseUrl = 'http://localhost:8080/auth';

module.exports = {
  registration: {
    endpoint: baseUrl + '/realms/test/clients-registrations',
    accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCIgOiAibGpfS2RFTUdFd1F5eFJwcXNJZk1OV1R2Zlk3NHFUZ3hsSm10SGVCaVJ2byJ9.eyJqdGkiOiJkNzllNjMzZS1iNjYxLTQxNTQtYTgwNy03ZmZiYTc5ZGE3OWYiLCJleHAiOjAsIm5iZiI6MCwiaWF0IjoxNDkyNzY4MTM0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvdGVzdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hdXRoL3JlYWxtcy90ZXN0IiwidHlwIjoiUmVnaXN0cmF0aW9uQWNjZXNzVG9rZW4iLCJyZWdpc3RyYXRpb25fYXV0aCI6ImF1dGhlbnRpY2F0ZWQifQ.0ba4EzEv36mPhh-DzLFoCSsbP0age2heUkLTrX6BOV4c6npVUl0tATezfU28Vr1dyigTy9cgtcNmtLq1GDTmHREua0YdMsAEDlEz4obq8EPywALJoIWo9QgMHkBh0VCGybDNqpCwC30Cz_Y_DEP-jh2HGrItepph_6cYSkpcmpRTlOh-cHzNJennU7Sq2WMO8IqzpaUOANldbKTkm2kIav9qTozAq11MVOJASn0ZOcNlkb-GWI9xvyqh6x4atT05f0GRhhJyfKhUH1ap12KgIbCWQeUBNyG-h4j2M6t1Y5CQMSTVK3xENlnJUsfbIeBGUcP8rQxLggwBdFS3t5a7Rw'
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



