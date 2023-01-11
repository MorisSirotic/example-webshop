export function authHeader(): any {
  // return authorization header with jwt token
  const extract = JSON.parse(localStorage.getItem("user")!);

  if (extract) {
    const { user } = extract;

    if (user && user.accessToken) {
      return { Authorization: `Bearer ${user.accessToken}` };
    } else {
      return {};
    }
  }
}

export function userIsLoggedIn(): boolean {
  // return authorization header with jwt token
  const extract = JSON.parse(localStorage.getItem("user")!);
  
  

  

  if (extract) {
    

    if (extract.isLoggedIn) {
      

      
      return true;
    }
  }

  return false;
}
export function redirect(): boolean {
  // return authorization header with jwt token
  const extract = JSON.parse(localStorage.getItem("user")!);
  
  

  

  if (extract) {
    

    if (extract.redirect) {
      

      
      return true;
    }
  }

  return false;
}
