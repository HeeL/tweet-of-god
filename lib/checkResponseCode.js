export default function checkResponseCode(response) {
    if (response.status >= 300) {
        throw new Error(`Bad response from server: ${response.status}. ${response.statusText}`);
    }
}
