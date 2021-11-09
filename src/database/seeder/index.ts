import config from 'config';
import seedCategoryData from './category';

const seedDatabase = (): void => {
  if (config.get('seed_database')) {
    seedCategoryData();
  }
};

export default seedDatabase;
