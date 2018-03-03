import React, { Component } from 'react';
import { Input, Form, Submit, Counter } from './styles';

export default class App extends Component {
    constructor(args) {
        super(...args);
        this.state = { tweetText: '' };
        this.updateTweetText = this.updateTweetText.bind(this);
        this.sendTweet = this.sendTweet.bind(this);
    }

    sendTweet(event) {
        event.preventDefault();
        window.location.href = 'https://twitter.com/heel';
        console.log(this.state.tweetText);
    }

    updateTweetText(event) {
        this.setState({ tweetText: event.target.value });
    }

    render() {
        return (
            <Form>
                <Input
                    type="text"
                    name="tweet"
                    maxLength="128"
                    onChange={this.updateTweetText}
                    value={this.state.tweetText}
                />

                <Submit
                    type="submit"
                    onClick={this.sendTweet}
                    value="Tweet it"
                />

                <Counter>
                    {Math.abs(128 - this.state.tweetText.length)}
                </Counter>
            </Form>
        );
    }
}
