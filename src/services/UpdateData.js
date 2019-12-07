export function UpdateData(type, userData) {
    let BaseURL = 'http://localhost:8080/react-calendar/backend/api/index.php';

    return new Promise((resolve, reject) => {
        fetch(BaseURL + '?tp=' + type, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}