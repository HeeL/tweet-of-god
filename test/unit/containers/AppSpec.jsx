import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../containers/App';

describe('App', () => {
    it('should render', () => {
        const app = shallow(<App />);

        expect(app).toHaveLength(1);
    });
});
