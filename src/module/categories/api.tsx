
  export function fetchAll() {
    return new Promise<{ data: any }>((resolve) =>
      fetch('https://dummyjson.com/products/categories')
        .then((response) => response.json())
        .then((data) => {
          console.log('This is your data', data);
          resolve({ data: data });
        }));
  }