import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../app/components/App';
import { Input, Submit, Counter, ErrorMessage } from '../../../app/components/styles';

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

            expect(app.find(ErrorMessage)).toHaveLength(0);
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
