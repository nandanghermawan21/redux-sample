
export function fetchAll() {
    return new Promise<{ data: any }>((resolve) =>
        fetch('https://dummyjson.com/products')
            .then((response) => response.json())
            .then((data) => {
                console.log('This is your product', data);
                resolve({ data: data });
            }));
}