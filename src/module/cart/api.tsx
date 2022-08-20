export function GetUserCart(userId : Number) {
    return new Promise<{ data: any }>((resolve) =>
        fetch('https://dummyjson.com/carts/user/'+userId)
            .then((response) => response.json())
            .then((data) => {
                console.log('This is your product', data);
                resolve({ data: data });
            }));
}