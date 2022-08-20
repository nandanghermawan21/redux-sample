
  export function fetchAll(onLoaded?: CallableFunction) {
    return new Promise<{ data: any }>((resolve) =>
      fetch('https://dummyjson.com/products/categories')
        .then((response) => response.json())
        .then((data) => {
          console.log('This is your data', data);
          if(onLoaded !== undefined){
            onLoaded();
          }
          resolve({ data: data });
        }));
  }