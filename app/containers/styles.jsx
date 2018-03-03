import glamorous from 'glamorous';

export const Form = glamorous.form({
    display: 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'center'
});

export const Input = glamorous.input({
    width: '100%',
    margin: '20px',
    padding: '5px',
    'font-size': '18px'
});

export const Submit = glamorous.input({
    'background-image': 'linear-gradient(to bottom, #3498db, #2980b9)',
    'font-size': '20px',
    'text-decoration': 'none',
    color: '#fff',
    padding: '10px 20px 10px 20px',
    background: '#3498db',
    ':hover': {
        background: '#3cb0fd',
        'background-image': 'linear-gradient(to bottom, #3cb0fd, #3498db)',
        'text-decoration': 'none'
    }
});
