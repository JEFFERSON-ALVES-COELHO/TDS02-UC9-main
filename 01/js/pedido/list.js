async function carregarPedidos() {
    try {
        const response = await fetch(`${API_BASE_URL}/Pedidos`);
        const pedidos = await response.json();

        const tbody = document.getElementById('tabela-pedidos');
        tbody.innerHTML = '';

        pedidos.forEach(pedido => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pedido.id}</td>
                <td>${pedido.cliente}</td>
                <td>${new Date(pedido.data).toLocaleDateString()}</td>
                <td>R$ ${pedido.total.toFixed(2)}</td>
                <td class="actions">    
                    <a href="detalhes.html?id=${pedido.id}">Detalhes</a>
                    <a href="form.html?id=${pedido.id}">Editar</a>
                    <a href="excluir.html?id=${pedido.id}" style="color: var(--danger-color);">Excluir</a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao carregar os pedidos:", error);
    }   
}

carregarPedidos();