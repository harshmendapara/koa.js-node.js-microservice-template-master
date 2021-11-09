import logger from '../../utils/logger';
import { Categorie } from '../../models';

const data = [
  { name: 'Agricultural', isActive: true, isDeleted: false},
  { name: 'Commercial', isActive: true, isDeleted: false },
  { name: 'Industrial', isActive: true, isDeleted: false },
  { name: 'Residential', isActive: true, isDeleted: false },
  { name: 'Mixed-Use', isActive: true, isDeleted: false },
  { name: 'Special Purpose', isActive: true, isDeleted: false }
];

export default (): void => {
  data.map(async (ele: any) => {
    // await Categorie.findOneAndUpdate(ele, ele, { upsert: true });
  });
  logger.info('Test database seeded');
};
