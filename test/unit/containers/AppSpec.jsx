import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../app/containers/App';
import { Input, Submit, Counter } from '../../../app/containers/styles';

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

    it('limits input field to 128 chars', () => {
        const app = shallow(<App />);
        const input = app.find(Input);

        expect(input.props()).toHaveProperty('maxLength', '128');
    });

    it('contains submit button', () => {
        const app = shallow(<App />);
        const submit = app.find(Submit);

        expect(submit).toHaveLength(1);
    });

    describe('Counter', () => {
        it('renders', () => {
            const app = shallow(<App />);
            const counter = app.find(Counter);

            expect(counter).toHaveLength(1);
        });

        it('shows value 128 initially', () => {
            const app = shallow(<App />);
            const counter = app.find(Counter).dive();

            expect(counter.text()).toEqual('128');
        });

        it('shows value 120 when 8 chars were entered', () => {
            const app = shallow(<App />);
            const input = app.find(Input);
            input.simulate('change', { target: { value: 'a'.repeat(8) } });
            const counter = app.find(Counter).dive();

            expect(counter.text()).toEqual('120');
        });

        it('shows value 0 when 128 chars were entered', () => {
            const app = shallow(<App />);
            const input = app.find(Input);
            input.simulate('change', { target: { value: 'b'.repeat(128) } });
            const counter = app.find(Counter).dive();

            expect(counter.text()).toEqual('0');
        });
    });
});
