import axios from 'axios';
import * as mongoose from 'mongoose';
import { RegisterDTO } from 'src/auth/auth.dto';
import { CreateProductDTO } from 'src/product/product.dto';
import { Product } from 'src/types/product';
import * as request from 'supertest';
import { app, database } from './constants';

let sellerToken: string;
let buyerToken: string;
let boughtProducts: Product[];
const orderSeller: RegisterDTO = {
  seller: true,
  username: 'orderSeller',
  password: 'password',
};
const orderBuyer: RegisterDTO = {
  seller: false,
  username: 'orderBuyer',
  password: 'password',
};
const soldProducts: CreateProductDTO[] = [
  {
    title: 'newer phone',
    image: 'n/a',
    description: 'description',
    price: 10,
  },
  {
    title: 'newest phone',
    image: 'n/a',
    description: 'description',
    price: 20,
  },
];

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();

  ({
    data: { token: sellerToken },
  } = await axios.post(`${app}/auth/register`, orderSeller));
  ({
    data: { token: buyerToken },
  } = await axios.post(`${app}/auth/register`, orderBuyer));

  const [{ data: data1 }, { data: data2 }] = await Promise.all(
    soldProducts.map(product =>
      axios.post(`${app}/product`, product, {
        headers: { authorization: `Bearer ${sellerToken}` },
      }),
    ),
  );

  boughtProducts = [data1, data2];
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('ORDER', () => {
  it('should create order of all products', async () => {
    const orderDTO = {
      products: boughtProducts.map(product => ({
        product: product._id,
        quantity: 1,
      })),
    };

    return request(app)
      .post('/order')
      .set('Authorization', `Bearer ${buyerToken}`)
      .set('Accept', 'application/json')
      .send(orderDTO)
      .expect(({ body }) => {
        expect(body.owner.username).toEqual(orderBuyer.username);
        expect(body.products.length).toEqual(boughtProducts.length);
        expect(
          boughtProducts
            .map(product => product._id)
            .includes(body.products[0].product._id),
        ).toBeTruthy();
        expect(body.totalPrice).toEqual(
          boughtProducts.reduce((acc, i) => acc + i.price, 0),
        );
      })
      .expect(201);
  });

  it('should list all orders of buyer', () => {
    return request(app)
      .get('/order')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0].products.length).toEqual(boughtProducts.length);
        expect(
          boughtProducts
            .map(product => product._id)
            .includes(body[0].products[0].product._id),
        ).toBeTruthy();
        expect(body[0].totalPrice).toEqual(
          boughtProducts.reduce((acc, i) => acc + i.price, 0),
        );
      })
      .expect(200);
  });

  // what to use for payment? stripe?
  // it('should process order', () => {});
});
