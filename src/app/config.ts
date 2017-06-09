export const CONFIG = {
  'development': {
    'API_URL': 'http://localhost:3000',
    'SOCKET_URL': 'http://localhost:5001'
  },
  'test': {
    'API_URL': 'http://localhost:3000',
    'SOCKET_URL': 'http://localhost:5001'
  },
  'production': {
    'API_URL': 'https://gmunumel-chat-rails-api-server.herokuapp.com',
    'SOCKET_URL': 'redis://h:p88d7fffee87cdb2e2dd69e1dea2d7a7c34f0b39d4cca4c7bb064d11dad4034e0@ec2-34-252-123-40.eu-west-1.compute.amazonaws.com:21829'
  }
};
