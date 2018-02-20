import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

process.once('unhandledRejection', (error) => {
  throw new Error(`Unhandled rejection: ${error.stack}`);
});
