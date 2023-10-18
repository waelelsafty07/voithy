import CreateUserDto from '../../users/user.dto';
import userModel from '../../users/user.model';
import TokenData from '../../interfaces/tokenData.interface';
import AuthenticationService from '../authentication.service';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import UserWithThatEmailAlreadyExistsException from '../../exceptions/UserWithThatEmailAlreadyExistsException';

  

describe('The AuthenticationService', () => {
  const authenticationService = new AuthenticationService();
  process.env.JWT_SECRET = "secret_key"
    beforeAll(async()=>{
        await mongoose.connect(`mongodb+srv://waelelsafty07:dQMYdYodwgJWveFN@cluster0.oso4wk9.mongodb.net/`);
    })
    afterAll(async()=>{
        mongoose.disconnect();
    })
  describe('when creating a cookie', () => {
    const tokenData: TokenData = {
      token: '',
      expiresIn: 1,
    };
    it('should return a string', () => {
      expect(typeof authenticationService.createCookie(tokenData)).toEqual('string');
    });
  });

  describe('when registering a user', () => {
    describe('if the email is taken', () => {
      it('should not throw an error', async () => {
        const userData: CreateUserDto = {
            firstName: 'John',
            lastName: 'Smith',
            email: 'john@smith.com',
            password: 'strongPassword123',
          };
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await userModel.create(
            {
                ...userData,
                password: hashedPassword
            }

            );
        await expect(authenticationService.register(userData)).rejects.toMatchObject(new UserWithThatEmailAlreadyExistsException(userData.email))
      });
    });
    describe('if the email is not taken', () => {
        it('should success register', async () => {
          const userData: CreateUserDto = {
              firstName: 'John3',
              lastName: 'Smith3',
              email: 'john3@smith.com',
              password: 'strongPassword123',
            };
          await expect(authenticationService.register(userData)).resolves.toBeDefined()
        });
      });
  });
});
