import Catalog from '../../components/Catalog';
import Filters from '../../components/Filters';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import Container from '../Container';

const HomePage = () => {
  return (
    <Container className="page__home">
      <Header className="page__header" hasSearch />
      <Filters className="page__filters" />
      <Catalog className="page__catalog" />
      <Pagination />
    </Container>
  );
};

export default HomePage;
