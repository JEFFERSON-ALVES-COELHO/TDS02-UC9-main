const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar forma de pagamento');
        const formaPagamento = await response.json();

        document.getElementById('titulo-pagina').innerText = "Editar Forma de Pagamento";
        document.getElementById('nome').value = formaPagamento.nome;
    } catch (error) {
        console.error("Erro ao carregar forma de pagamento:", error);
        alert('Erro ao carregar os dados da forma de pagamento');
    }
}

if (id) {
    buscarDetalhes();
}   