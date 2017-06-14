const net = jest.genMockFromModule('net');

net.__server__ = {
  listen: jest.fn()
};

net.createServer.mockReturnValue(net.__server__);

export default net;
