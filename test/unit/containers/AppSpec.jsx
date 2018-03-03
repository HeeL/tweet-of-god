import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../app/containers/App';
import { Input, Submit } from '../../../app/containers/styles';

describe('App', () => {
    it('renders', () => {
        const app = shallow(<App />);

        expect(app).toHaveLength(1);
    });

    it('contains input field', () => {
        const app = shallow(<App />);
        const input = app.find(Input);

        expect(input).toHaveLength(1);
    });

    it('contains submit button', () => {
        const app = shallow(<App />);
        const input = app.find(Submit);

        expect(input).toHaveLength(1);
    });
});
