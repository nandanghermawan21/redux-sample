import { RefCallback } from "react";

export function login(onLoggedIn? : RefCallback<Number>) {
    return new Promise<{ data: any }>((resolve) =>
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
          // expiresInMins: 60, // optional
        })
      })
      .then(res => res.json())
      .then((data) => {
        console.log('This is your data login', data);
        if(onLoggedIn !== undefined){
          onLoggedIn(data["id"]);
        }
        resolve({ data: data });
    }));
}