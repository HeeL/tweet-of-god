import React from 'react';
import { shallow } from 'enzyme';
import Error from '../../../app/components/Error';

describe('Error', () => {
    it('renders', () => {
        const error = shallow(<Error message="foo" />);

        expect(error).toHaveLength(1);
    });

    it('renders nothing when message is empty', () => {
        const error = shallow(<Error message="" />);

        expect(error.type()).toBeNull();
    });

    it('renders provided message', () => {
        const message = 'foo barrr';
        const error = shallow(<Error message={message} />);

        expect(error.dive().text()).toEqual(message);
    });
});
