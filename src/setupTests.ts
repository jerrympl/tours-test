import { configure } from 'enzyme';
import 'jest-localstorage-mock';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import ReactModal from 'react-modal';
import 'core-js/stable';

process.env.REACT_APP_ENABLE_ALL_FEATURES = 'false';

configure({ adapter: new Adapter() });

// Workaround for:
// `Warning: react-modal: App element is not defined.`
ReactModal.setAppElement(document.createElement('div'));
