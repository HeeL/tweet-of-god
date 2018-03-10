import React from 'react';
import { shallow } from 'enzyme';
import Counter from '../../../app/components/Counter';

describe('Counter', () => {
    it('renders', () => {
        const counter = shallow(<Counter />);

        expect(counter).toHaveLength(1);
    });

    it('shows 128 when currentTextLength is zero', () => {
        const counter = shallow(<Counter currentTextLength={0} />);

        expect(counter.dive().text()).toEqual('128');
    });

    it('shows 99 when currentTextLength is 29', () => {
        const counter = shallow(<Counter currentTextLength={29} />);

        expect(counter.dive().text()).toEqual('99');
    });

    it('shows 0 when currentTextLength is 128', () => {
        const counter = shallow(<Counter currentTextLength={128} />);

        expect(counter.dive().text()).toEqual('0');
    });
});
