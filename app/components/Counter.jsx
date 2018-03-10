import React from 'react';
import glamorous from 'glamorous';
import { TWEET_MAX_LENGTH } from '../config.json';

const SpanStyled = glamorous.span({
    color: '#999',
    fontSize: '11px',
    marginLeft: '4px'
});

export default (props) => (
    <SpanStyled>
        {Math.abs(TWEET_MAX_LENGTH - props.currentTextLength)}
    </SpanStyled>
);
