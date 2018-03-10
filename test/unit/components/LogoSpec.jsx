import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../../app/components/Logo';

describe('Logo', () => {
    it('renders', () => {
        const logo = shallow(<Logo />);

        expect(logo).toHaveLength(1);
    });

    it('has required alt attribute', () => {
        const logo = shallow(<Logo />);

        expect(logo.prop('alt')).toEqual('Tweet of God');
    });

    it('has src attribute set to logo image in assets', () => {
        const logo = shallow(<Logo />);

        expect(logo.prop('src')).toEqual('/assets/logo.png');
    });
});
