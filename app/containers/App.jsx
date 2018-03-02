import React, { Component } from 'react';

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
            <form>
                <input
                    type="text"
                    name="tweet"
                    onChange={this.updateTweetText}
                    value={this.state.tweetText}
                />

                <input
                    type="submit"
                    onClick={this.sendTweet}
                    value="Tweet It!"
                />
            </form>
        );
    }
}
