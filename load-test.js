import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  scenarios: {
    constant_load: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "constantLoad",
      startTime: "0s",
    },
    ramping_load: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "20s", target: 10 },
        { duration: "30s", target: 20 },
        { duration: "10s", target: 0 },
      ],
      exec: "rampingLoad",
      startTime: "35s",
    },
    constant_arrival_rate: {
      executor: "constant-arrival-rate",
      rate: 20,
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 20,
      exec: "constantArrivalRate",
      startTime: "100s",
    },
  },
};

function makeRequest() {
  const productId = Math.floor(Math.random() * 100) + 1;
  const res = http.get(`http://localhost:3000/products/${productId}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response has id": (r) => r.json("id") !== undefined,
    "response has name": (r) => r.json("name") !== undefined,
  });

  sleep(1);
}

export function constantLoad() {
  makeRequest();
}

export function rampingLoad() {
  makeRequest();
}

export function constantArrivalRate() {
  makeRequest();
}
