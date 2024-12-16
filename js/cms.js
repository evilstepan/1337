
async function fetchGoods() {
    try {
        const response = await fetch('/api/goods');
        if (!response.ok) throw new Error('Network response was not ok');
        const goods = await response.json();
        populateTable(goods);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function populateTable(goods) {
    const tableBody = document.querySelector('.table-section tbody');
    tableBody.innerHTML = ''; 
    goods.forEach(good => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${good.id}</td>
            <td>${good.name}</td>
            <td>${good.category}</td>
            <td>шт</td>
            <td>1</td>
            <td>$${good.price}</td>
            <td>${good.price}</td>
            <td><img src="carbon_no-image.svg" alt="" width="20px" height="20px"></td>
            <td><img src="akar-icons_edit.svg" alt="" width="20px" height="20px"></td>
            <td><img src="remove.svg" alt="" width="20px" height="20px"></td>
        `;
        tableBody.appendChild(row);
    });
}
document.querySelector('.add-product').addEventListener('click', async () => {
    const newProductData = {
        name: 'Новый товар', 
        category: 'Новая категория',
        price: 150,
    };

    try {
        const response = await fetch('/api/goods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProductData),
        });

        if (response.ok) {
            const newProduct = await response.json();
            addRowToTable(newProduct);
            closeModal(); 
        } else {
            const errorData = await response.json();
            displayErrorMessages(errorData.errors || ['Что-то пошло не так...']);
        }
    } catch (error) {
        console.error('Ошибка при добавлении товара:', error);
    }
});
function addRowToTable(product) {
    const tableBody = document.querySelector('.table-section tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>шт</td>
        <td>1</td>
        <td>$${product.price}</td>
        <td>${product.price}</td>
        <td><img src="carbon_no-image.svg" alt="" width="20px" height="20px"></td>
        <td><img src="akar-icons_edit.svg" alt="" width="20px" height="20px"></td>
        <td><img src="remove.svg" alt="" width="20px" height="20px"></td>
    `;
    tableBody.appendChild(row);
}
function displayErrorMessages(errors) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-messages';
    errorContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
    const existingErrors = document.querySelector('.error-messages');
    if (existingErrors) existingErrors.remove();

    document.body.prepend(errorContainer);
}

function closeModal() {
}
document.addEventListener('DOMContentLoaded', fetchGoods);
