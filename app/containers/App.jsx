import React, { Component } from 'react';
import glamorous from 'glamorous';

const Form = glamorous.form({
    width: '100%'
});

const Input = glamorous.input({
    width: '100%'
});

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
