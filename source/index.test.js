jest.mock('supervisord');
jest.mock('net');

describe('supervisor status', () => {
  let net, supervisord;

  beforeEach(() => {
    supervisord = require('supervisord').default;
    net = require('net').default;

    require('../source/index');
  });

  test('it connects to the expected url', () => {
    expect(supervisord.connect).toHaveBeenCalledWith('http://127.0.0.1:9100');
  });

  test('it listens on the fd', () => {
    expect(net.__server__.listen).toHaveBeenCalledWith({ fd: 3 });
  });

  describe('connection', () => {
    let connection, processCb;

    beforeEach(() => {
      connection = {
        end: jest.fn()
      };

      net.createServer.mock.calls[0][0](connection);
      processCb = supervisord.__client__.getAllProcessInfo.mock.calls[0][0];
    });

    test('it calls supervisord.getAllProcessInfo', () => {
      expect(supervisord.__client__.getAllProcessInfo).toHaveBeenCalled();
    });

    test('it ends with result', () => {
      processCb(null, { foo: 'bar' });

      expect(connection.end).toHaveBeenCalledWith('{"result":{"foo":"bar"}}');
    });

    test('it ends with error', () => {
      processCb(new Error('boom!'));

      expect(connection.end).toHaveBeenCalledWith(
        '{"error":"An unexpected error has occured. Please try again."}'
      );
    });
  });
});
