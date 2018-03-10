import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../app/components/App';
import Counter from '../../../app/components/Counter';
import Logo from '../../../app/components/Logo';
import Error from '../../../app/components/Error';
import { Input, Submit } from '../../../app/components/styles';

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

        expect(input.props()).toHaveProperty('maxLength', 128);
    });

    it('contains submit button', () => {
        const app = shallow(<App />);
        const submit = app.find(Submit);

        expect(submit).toHaveLength(1);
    });

    it('renders logo', () => {
        const app = shallow(<App />);
        const logo = app.find(Logo);

        expect(logo).toHaveLength(1);
    });

    describe('Submit', () => {
        const defaultEvent = { preventDefault() {} };

        it('prevents default submit', () => {
            const fetch = jest.fn(() => Promise.resolve({ status: 200 }));
            const window = { location: {}, fetch };
            const event = { preventDefault: jest.fn() };
            const app = shallow(<App window={window} />);
            app.find(Submit).simulate('click', event);

            expect(event.preventDefault).toHaveBeenCalledTimes(1);
        });

        it('sends request to the /sendTweet route with text', () => {
            const fetch = jest.fn(() => Promise.resolve({ status: 200 }));
            const window = { location: {}, fetch };
            const app = shallow(<App window={window} />);
            app.find(Submit).simulate('click', defaultEvent);

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith('/sendTweet?tweetText=');
        });

        it('sends input text with request', () => {
            const fetch = jest.fn(() => Promise.resolve({ status: 200 }));
            const window = { location: {}, fetch };
            const app = shallow(<App window={window} />);
            const event = { target: { value: 'foobar' } };
            app.find(Input).simulate('change', event);
            app.find(Submit).simulate('click', defaultEvent);

            expect(fetch).toHaveBeenCalledWith('/sendTweet?tweetText=foobar');
        });

        it('encodes input text before send', () => {
            const fetch = jest.fn(() => Promise.resolve({ status: 200 }));
            const window = { location: {}, fetch };
            const app = shallow(<App window={window} />);
            const event = { target: { value: 'foo bar' } };
            app.find(Input).simulate('change', event);
            app.find(Submit).simulate('click', defaultEvent);

            expect(fetch).toHaveBeenCalledWith('/sendTweet?tweetText=foo%20bar');
        });

        it('shows NO error in initial state', () => {
            const app = shallow(<App />);
            const error = app.find(Error);

            expect(error.prop('message')).toEqual('');
        });

        it('has form fields enabled in initial state', () => {
            const app = shallow(<App />);

            expect(app.find(Input).prop('disabled')).toBeUndefined();
            expect(app.find(Submit).prop('disabled')).toBeUndefined();
        });

        it('has form fields enabled after submission', () => {
            const fetch = jest.fn(() => Promise.resolve({ status: 200 }));
            const window = { location: {}, fetch };
            const app = shallow(<App window={window} />);

            expect(app.find(Input).prop('disabled')).toBeUndefined();
            expect(app.find(Submit).prop('disabled')).toBeUndefined();
        });

        it('has form fields enabled after failure', () => {
            const fetch = jest.fn(() => Promise.rejects());
            const window = { location: {}, fetch };
            const app = shallow(<App window={window} />);

            expect(app.find(Input).prop('disabled')).toBeUndefined();
            expect(app.find(Submit).prop('disabled')).toBeUndefined();
        });
    });

    describe('Counter', () => {
        it('renders', () => {
            const app = shallow(<App />);
            const counter = app.find(Counter);

            expect(counter).toHaveLength(1);
        });

        it('recieves 0 for currentTextLength prop initially', () => {
            const app = shallow(<App />);
            const counter = app.find(Counter);

            expect(counter.prop('currentTextLength')).toEqual(0);
        });

        it('recieves text length for currentTextLength prop', () => {
            const app = shallow(<App />);
            const input = app.find(Input);
            const textLength = 8;
            input.simulate('change', { target: { value: 'a'.repeat(textLength) } });
            const counter = app.find(Counter);

            expect(counter.prop('currentTextLength')).toEqual(8);
        });
    });
});
