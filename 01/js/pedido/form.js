const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function carregarPedido() {
    if (id) {
        document.getElementById('titulo-pagina').innerText = "Editar Pedido";
        try {
            const response = await fetch(`${API_BASE_URL}/Pedidos/${id}`);
            if (!response.ok) throw new Error('Erro ao carregar pedido');
            const pedido = await response.json();
            
            document.getElementById('data').value = pedido.data.split('T')[0];
            document.getElementById('clienteId').value = pedido.clienteId;
        } catch (error) {
            console.error("Erro ao carregar pedido:", error);
            alert('Erro ao carregar os dados do pedido');
        }
    }
}


form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const data = document.getElementById('data').value;
    const clienteId = parseInt(document.getElementById('clienteId').value);

    if (!data || !clienteId) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }

    const pedidoDados = {
        id: id ? parseInt(id) : 0,
        data: data,
        clienteId: clienteId
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/Pedidos/${id}` : `${API_BASE_URL}/Pedidos`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidoDados)
        });

        if (!response.ok) throw new Error('Erro ao salvar pedido');

        alert('Pedido salvo com sucesso!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Erro ao salvar pedido:", error);
        alert('Erro ao salvar o pedido');
    }
});

carregarPedido();