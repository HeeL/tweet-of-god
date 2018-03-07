export default function checkResponseCode(response) {
    if (response.status >= 300) {
        throw new Error(`Error ${response.status}: ${response.errorMessage || response.statusText}`);
    }
}
