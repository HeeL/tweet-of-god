import React from 'react';
import glamorous from 'glamorous';

export const DivStyled = glamorous.div({
    width: '100%',
    color: '#D8000C',
    backgroundColor: '#FFD2D2',
    margin: '10px 22px',
    verticalAlign: 'middle',
    textAlign: 'center',
    padding: '7px'
});

export default ({ message }) => (message === '' ? null : <DivStyled>{message}</DivStyled>);
