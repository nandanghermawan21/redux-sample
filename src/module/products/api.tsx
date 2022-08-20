
export function fetchAll(category? : String) {
    var url = "";

    if(category == null){
        url = "https://dummyjson.com/products"
    }else{
        url = "https://dummyjson.com/products/category/"+category;
    }

    console.log("request : ",url);
    return new Promise<{ data: any }>((resolve) =>
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log('This is your product', data);
                resolve({ data: data });
            }));
}