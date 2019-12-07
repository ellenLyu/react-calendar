let BaseURL = 'http://localhost:8080/react-calendar/backend/api/index.php';

export function PostData(type, data) {

    return new Promise((resolve, reject) => {
        fetch(BaseURL + '?tp=' + type, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((res) => {
                resolve(res);
            })
        }).catch((error) => {
            reject(error);
        });
    });
}
