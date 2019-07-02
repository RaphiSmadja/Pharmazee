import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: true,
  baseUrl: 'http://51.77.220.167:3000/',
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
}),
withCredentials: true
},
  stripePublishKey: 'pk_test_n8nR4oFHfsPWR78a3uyh8Jov00mWHeze1z'
};
