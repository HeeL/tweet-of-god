import checkResponseCode from '../../../lib/checkResponseCode';

describe('checkResponseCode', () => {
    it('throws on 404 response code', () => {
        const expectedError = 'Bad response from server: 404. foobar';
        const response = { status: 404, statusText: 'foobar' };

        expect(checkResponseCode.bind(null, response)).toThrowError(expectedError);
    });

    it('throws on 300 response code', () => {
        const expectedError = 'Bad response from server: 300. xxx';
        const response = { status: 300, statusText: 'xxx' };

        expect(checkResponseCode.bind(null, response)).toThrowError(expectedError);
    });

    it('NOT throws on 299 response code', () => {
        const response = { status: 299, statusText: 'xxx' };

        expect(checkResponseCode(response)).toBeUndefined();
    });

    it('NOT throws on 200 response code', () => {
        const response = { status: 200, statusText: 'xxx' };

        expect(checkResponseCode(response)).toBeUndefined();
    });
});
