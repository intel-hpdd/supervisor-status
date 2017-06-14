const supervisord = jest.genMockFromModule('supervisord');

supervisord.__client__ = {
  getAllProcessInfo: jest.fn()
};

supervisord.connect.mockReturnValue(supervisord.__client__);

export default supervisord;
