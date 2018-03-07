import React, { Component } from 'react';
import { Input, Form, Submit, Counter, ErrorMessage } from './styles';

const TWEET_MAX_LENGTH = 128;

const renderErrorIfItExists = error => (error === '' ? null : <ErrorMessage>{error}</ErrorMessage>);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { tweetText: '', errorText: '', loading: false };
        this.updateTweetText = this.updateTweetText.bind(this);
        this.sendTweet = this.sendTweet.bind(this);
    }

    setLoadingState(loading) {
        this.setState({ loading });
    }

    sendTweet(event) {
        event.preventDefault();
        this.setLoadingState(true);
        const tweetText = encodeURIComponent(this.state.tweetText);
        this.props.window.fetch(`/sendTweet?tweetText=${tweetText}`)
            .then((response) => {
                if (response.status >= 300) {
                    throw new Error(`Bad response from server: ${response.status}. ${response.statusText}`);
                }
            })
            .then(() => {
                this.props.window.location.href = 'https://twitter.com/heel';
            })
            .catch((error) => this.setState({ errorText: error.message }))
            .then(this.setLoadingState.bind(this, false));
    }

    updateTweetText(event) {
        this.setState({ tweetText: event.target.value });
    }

    render() {
        const disabled = this.state.loading ? true : undefined;
        const inputProps = {
            type: 'text',
            name: 'tweet',
            maxLength: TWEET_MAX_LENGTH,
            onChange: this.updateTweetText,
            value: this.state.tweetText,
            disabled
        };
        const submitProps = {
            type: 'submit',
            onClick: this.sendTweet,
            value: 'Tweet it',
            disabled
        };

        return (
            <Form>
                <img src="/assets/logo.png" alt="Tweet Of God" />
                { renderErrorIfItExists(this.state.errorText) }
                <Input {...inputProps} />
                <Submit {...submitProps} />

                <Counter>
                    {Math.abs(TWEET_MAX_LENGTH - this.state.tweetText.length)}
                </Counter>
            </Form>
        );
    }
}
