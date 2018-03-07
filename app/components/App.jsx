import React, { Component } from 'react';
import { Input, Form, Submit, Counter, ErrorMessage } from './styles';
import checkResponseCode from '../../lib/checkResponseCode';

const TWEET_MAX_LENGTH = 128;

const renderErrorIfItExists = error => (error === '' ? null : <ErrorMessage>{error}</ErrorMessage>);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { tweetText: '', errorMessage: '', loading: false };
        this.updateTweetText = this.updateTweetText.bind(this);
        this.sendTweet = this.sendTweet.bind(this);
        this.redirectToTwitter = this.redirectToTwitter.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
    }

    setLoadingState(loading) {
        this.setState({ loading });
    }

    setErrorMessage(error) {
        this.setState({ errorMessage: error.message });
    }

    redirectToTwitter() {
        this.props.window.location.href = 'https://twitter.com/heel';
    }

    sendTweet(event) {
        event.preventDefault();
        this.setLoadingState(true);
        const tweetText = encodeURIComponent(this.state.tweetText);
        this.props.window.fetch(`/sendTweet?tweetText=${tweetText}`)
            .then(checkResponseCode)
            .then(this.redirectToTwitter)
            .catch(this.setErrorMessage)
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
                { renderErrorIfItExists(this.state.errorMessage) }
                <Input {...inputProps} />
                <Submit {...submitProps} />

                <Counter>
                    {Math.abs(TWEET_MAX_LENGTH - this.state.tweetText.length)}
                </Counter>
            </Form>
        );
    }
}
