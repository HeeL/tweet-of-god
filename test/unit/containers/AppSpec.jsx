import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../app/containers/App';

describe('App', () => {
    it('renders', () => {
        const app = shallow(<App />);

        expect(app).toHaveLength(1);
    });

    it('contains input field', () => {
        const app = shallow(<App />);
        const input = app.find('input[type="text"]');

        expect(input).toHaveLength(1);
    });

    it('contains submit button', () => {
        const app = shallow(<App />);
        const input = app.find('input[type="submit"]');

        expect(input).toHaveLength(1);
    });
});
