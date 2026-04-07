import { expect } from 'chai';
import { config } from 'dotenv';
import axios from 'axios';
config();

describe("Send message", function () {
  it('POST /api/auth/token/', async () => {
    console.log("Login test");

    const roomId = process.env.ROOM_ID;
    const eventType = "m.room.message";
    const transactionId = 1;

    const endpoint = `/_matrix/client/v3/rooms/${roomId}/send/${eventType}/${transactionId}`;
    const URL = process.env.BASE_URL + endpoint;

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
    }

    const body = {
      "body": "Hello from Mocha tests",
      "msgtype": "m.text"
    }

    let status = 0
    try {

      const response = await axios.put(URL, body, {
        headers: headers
      });

      status = response.status;
      const data = response.data;

      process.env.ACCESS_TOKEN = data.access_token;

      console.log(`put ${endpoint} resolved with status ${status} and data ${JSON.stringify(data)}`);

    } catch(error) {
      console.error(`put ${endpoint} rejected with error ${JSON.stringify(error)}`); 
    }

    expect(status).to.equal(200);
  });
});

