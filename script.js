let items = [];

function addItem() {
    const itemValue = parseInt(prompt("Valor do item:"));
    const itemWeight = parseInt(prompt("Peso do item:"));

    if (itemValue >= 0 && itemWeight >= 0) {
        const item = {
            value: itemValue,
            weight: itemWeight
        };

        items.push(item);

        renderItems();
    } else {
        alert("Por favor, preencha corretamente os valores do item.");
    }
}

function removeItem(index) {
    items.splice(index, 1);
    renderItems();
}

function renderItems() {
    const itemsContainer = document.getElementById("itemsContainer");
    itemsContainer.innerHTML = "";

    items.forEach((item, index) => {
        const newItemElement = document.createElement("div");
        newItemElement.className = "item";

        const obstacleClass = generateObstacleClass();
        const itemImageElement = document.createElement("div");
        itemImageElement.className = "item-image";
        itemImageElement.classList.add("obstacle", obstacleClass);

        newItemElement.appendChild(itemImageElement);

        const itemValueElement = document.createElement("div");
        itemValueElement.className = "item-value";
        itemValueElement.textContent = `Valor ${item.value}`;

        const itemWeightElement = document.createElement("div");
        itemWeightElement.className = "item-weight";
        itemWeightElement.textContent = `Peso ${item.weight}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "-";
        removeButton.onclick = () => removeItem(index);

        newItemElement.appendChild(itemValueElement);
        newItemElement.appendChild(itemWeightElement);
        newItemElement.appendChild(removeButton);

        itemsContainer.appendChild(newItemElement);
    });
}

function generateObstacleClass() {
    let obstacleClass = "";
    let random = Math.random();

    if (random < 0.8) {
        obstacleClass = "obstacle-1";
    } else if (random < 0.9) {
        obstacleClass = "obstacle-2";
    } else if (random < 0.95) {
        obstacleClass = "obstacle-3";
    } else {
        obstacleClass = "obstacle-4";
    }

    return obstacleClass;
}


function knapsack() {
    const capacity = parseInt(document.getElementById("capacity").value);
    const n = items.length;

    const dp = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(capacity + 1).fill(0);
    }

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (items[i - 1].weight <= w) {
                dp[i][w] = Math.max(
                    items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    const selectedItems = [];
    let i = n,
        w = capacity;

    while (i > 0 && w > 0) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            w -= items[i - 1].weight;
        }
        i--;
    }

    renderItemsWithSelection(selectedItems);
}

function renderItemsWithSelection(selectedItems) {
    const itemsContainer = document.getElementById("itemsContainer");
    const itemElements = itemsContainer.getElementsByClassName("item");

    for (let i = 0; i < itemElements.length; i++) {
        const itemElement = itemElements[i];
        if (selectedItems.includes(items[i])) {
            itemElement.classList.add("selected");
            itemElement.classList.remove("not-selected");
        } else {
            itemElement.classList.add("not-selected");
            itemElement.classList.remove("selected");
        }
    }

    const totalItemsElement = document.getElementById("totalItems");
    totalItemsElement.textContent = selectedItems.length;

    const totalValueElement = document.getElementById("totalValue");
    const totalValue = selectedItems.reduce((sum, item) => sum + item.value, 0);
    totalValueElement.textContent = totalValue;
}
