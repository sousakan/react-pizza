import Cart from '../../components/Cart';
import Empty from '../../components/Empty';
import Header from '../../components/Header';
import Container from '../Container';

const CartPage = () => {
  return (
    <Container>
      <Header />
      {/* <Empty /> */}
      <Cart />
    </Container>
  );
};

export default CartPage;
