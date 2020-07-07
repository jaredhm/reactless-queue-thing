const HOSTNAME = "http://localhost:8080";

function getOrders(hostName=HOSTNAME) {
    const url = new URL("/orders", hostName);
    return fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    });
}

function processOrder(hostName=HOSTNAME) {
    const url = new URL("/orders/process", hostName);
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache"
    });
}

export {
    getOrders,
    processOrder
};