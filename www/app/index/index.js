import moment from "moment";
import styles from "./styles.css";
import { getOrders, processOrder } from "util/api.js";

const clearOrders = () => {
    document.getElementById("main").innerHTML = "";
}

const fetchAndDrawOrders = () => {
    getOrders()
        .then(res => res.json())
        .then(data => drawOrders(data))
        .catch(err => console.error(err));
};

const processOrderEventHandler = (e) => {
    clearOrders();
    processOrder().then(fetchAndDrawOrders);
};

const styleView = () => {
    const main = document.getElementById("main");
    main.classList.add(styles.main);
};

const drawOrders = (orders) => {
    if(!orders.length)
        return;
    const main = document.getElementById("main");
    const orderContainers = orders
        .map(o => {
            // Container
            const orderContainer = document.createElement("div");
            orderContainer.classList.add(styles.orderContainer);
            // -- Heading Link
            const orderHeading = document.createElement("a")
            orderHeading.setAttribute("href", "orders/" + o.uuid);
            orderHeading.innerHTML = o.name;
            orderContainer.appendChild(orderHeading);
            // ---- Details
            const orderDetails = document.createElement("div");
            // ------ Phone
            const phone = document.createElement("p");
            phone.innerHTML = `Phone: ${o.phone}`;
            // ------ Time
            const time = document.createElement("p");
            time.innerHTML = `Time: ${moment(o.timeUTC).local().format("h:m D/M/YYYY")}`;
            orderDetails.appendChild(phone);
            orderDetails.appendChild(time);
            orderContainer.appendChild(orderDetails);
            return orderContainer;
        });
    const processOrderButton = document.createElement("button");
    processOrderButton.onclick = processOrderEventHandler;
    processOrderButton.innerHTML = "Process Order";
    orderContainers[0].appendChild(processOrderButton);
    orderContainers.forEach(elem => main.appendChild(elem));
};

const init = () => {
    styleView();
    clearOrders();
    fetchAndDrawOrders();
};

export {
    init,
    clearOrders,
    fetchAndDrawOrders
};