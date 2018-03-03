import React, { Component } from 'react';
import { Input, Form } from './styles';

export default class App extends Component {
    constructor(args) {
        super(...args);
        this.state = { tweetText: '' };
        this.updateTweetText = this.updateTweetText.bind(this);
        this.sendTweet = this.sendTweet.bind(this);
    }

    sendTweet(event) {
        event.preventDefault();
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
                    onChange={this.updateTweetText}
                    value={this.state.tweetText}
                />

                <Input
                    type="submit"
                    onClick={this.sendTweet}
                    value="Tweet It!"
                />
            </Form>
        );
    }
}
