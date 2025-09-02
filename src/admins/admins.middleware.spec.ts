import { AdminsMiddleware } from './admins.middleware';

describe('AdminsMiddleware', () => {
  it('should be defined', () => {
    expect(new AdminsMiddleware()).toBeDefined();
  });
});
