import { expect } from 'chai';
import fetch from 'node-fetch';
import { config } from 'dotenv';
import axios from 'axios';
config();

describe("Login", function () {
  it('POST /api/auth/token/', async () => {
    console.log("Login test");

    const endpoint = "/_matrix/client/v3/login";
    const URL = process.env.BASE_URL + endpoint;

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const body = {
      "identifier": {
        "type": "m.id.user",
        "user": process.env.LOGIN
        },
      "initial_device_display_name": "Mocha Tests",
      "password": process.env.PASSWORD,
      "type": "m.login.password"
    }

    let status = 0
    try {

      const response = await axios.post(URL, body, {
        headers: headers
      });

      status = response.status;
      const data = response.data;

      process.env.ACCESS_TOKEN = data.access_token;

      console.log(`POST ${endpoint} resolved with status ${status} and data ${JSON.stringify(data)}`);
    } catch(error) {
      console.error(`POST ${endpoint} rejected with error ${JSON.stringify(error)}`); 
    }

    expect(status).to.equal(200);
  });
});

