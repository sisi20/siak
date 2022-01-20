/* eslint-disable object-shorthand */
/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
/* eslint-disable eol-last */
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
export const methodDELETE = async ({ endpoint }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/api${endpoint}`,
    {
      method: 'DELETE',
      headers: headers
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error('err', err);
    });
};
export const methodGETImage = async ({ endpoint }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/gambar${endpoint}`,
    {
      method: 'GET',
      headers: headers
    }
  )
    .then((res) => res)
    .catch((err) => {
      console.error('err', err);
    });
};
export const methodPUTImage = async ({ endpoint, body }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/api${endpoint}`,
    {
      method: 'PUT',
      body: body
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error('err', err);
    });
};
export const methodPUT = async ({ endpoint, body }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/api${endpoint}`,
    {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error('err', err);
    });
};
export const methodPOST = async ({ endpoint, body }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/api${endpoint}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error('err', err);
    });
};
export const methodPOSTImage = async ({ endpoint, body }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/api${endpoint}`,
    {
      method: 'POST',
      body: body
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error('err', err);
    });
};
export const methodGET = async ({ endpoint }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/api${endpoint}`,
    {
      method: 'GET',
      headers: headers
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error('err', err);
    });
};
export const methodPOSTSignUp = async ({ endpoint, body }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/api/auth${endpoint}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error('err', err);
    });
};
export const methodPOSTSignIn = async ({ endpoint, body }) => {
  return await fetch(
    `https://calm-savannah-30077.herokuapp.com/api/auth${endpoint}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error('err', err);
    });
};
