var baseUrl = 'http://keycloak-server-snapscreen.74.207.224.48.xip.io/auth';

module.exports = {
  registration: {
    endpoint: baseUrl + '/realms/test/clients-registrations',
    //generate initial access token , this will create a client, Test won't create the same client more that once
    accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCIgOiAiOHN3ZkU0b0VvbDZCdjFXeVZDdzZVandNYUtyaEg5N3NvdTdwcy1XS1lJTSJ9.eyJqdGkiOiI4MjU2M2E1NC1hYjBmLTRlNTYtYTQ0Ny1mM2MxNjIyMzUxNTAiLCJleHAiOjE1NzkxODA4NDEsIm5iZiI6MCwiaWF0IjoxNDkyNzgwODQxLCJpc3MiOiJodHRwOi8va2V5Y2xvYWstc2VydmVyLXNuYXBzY3JlZW4uNzQuMjA3LjIyNC40OC54aXAuaW8vYXV0aC9yZWFsbXMvdGVzdCIsImF1ZCI6Imh0dHA6Ly9rZXljbG9hay1zZXJ2ZXItc25hcHNjcmVlbi43NC4yMDcuMjI0LjQ4LnhpcC5pby9hdXRoL3JlYWxtcy90ZXN0IiwidHlwIjoiSW5pdGlhbEFjY2Vzc1Rva2VuIn0.ZYoWsYuuPbz-bbuccIE3DAeeepf_LVHQvgHTr5s0uim0-VmdroD59Yu_UeKqtpCZcJUJhErBgZtvTd6tOAG3595Hys3D3z_IIwzfZXZTFmo-OjHKd927VPw3IPhqzPdglKUM4NQgcNbRcN4T6vw5TbbI1UAJFPlY5QxjAMeX0Vy8JatNG0vF19QAvtIZQz1nEjvd-WXmqL9cALIrkGYoBwgyjlMEhcmeWIntEU_eavYFLFbjJOFb0HH2ZK6PJ_51-iNO9rPqHS-vwwj5vCeNUXe2Q4iCyOyqXjHDOHlJ_-32S5TeePl_wB_9Js4j7rNqq5XsPck2QwyCQBVOIouiIg',
  },
  baseUrl: baseUrl,
  token: {
    username: 'test@test.com',
    password: 'test',
    grant_type: 'password',
    client_id: 'test-client',
    realmName: 'test',
  },
  testClient: {
    clientId: 'test-client',
    consentRequired: 'false',
    publicClient: 'true',
    standardFlowEnabled: 'false',
    directAccessGrantsEnabled: 'true',
    fullScopeAllowed: 'true',
  },
};
