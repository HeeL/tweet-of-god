import glamorous from 'glamorous';

export const Form = glamorous.form({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
});

export const Input = glamorous.input({
    width: '100%',
    margin: '20px',
    padding: '5px',
    fontSize: '18px'
});

export const ErrorMessage = glamorous.div({
    width: '100%',
    color: '#D8000C',
    backgroundColor: '#FFD2D2',
    margin: '10px 22px',
    verticalAlign: 'middle',
    textAlign: 'center',
    padding: '7px'
});

export const Counter = glamorous.span({
    color: '#999',
    fontSize: '11px',
    marginLeft: '4px'
});

export const Submit = glamorous.input({
    backgroundImage: 'linear-gradient(to bottom, #3498db, #2980b9)',
    fontSize: '20px',
    textDecoration: 'none',
    color: '#fff',
    padding: '10px 20px 10px 20px',
    background: '#3498db',
    ':hover': {
        background: '#3cb0fd',
        backgroundImage: 'linear-gradient(to bottom, #3cb0fd, #3498db)',
        textDecoration: 'none'
    }
});
