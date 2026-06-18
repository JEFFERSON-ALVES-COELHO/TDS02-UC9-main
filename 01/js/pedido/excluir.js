const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormasPagamento/${id}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erro ao carregar forma de pagamento');
        const dados = await response.json();
        exibirDetalhes(dados);
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        document.getElementById('dados-forma-pagamento').innerHTML = `<p style="color: red;">Erro ao carregar detalhes da forma de pagamento.</p>`;
    }
}

async function excluirFormaPagamento() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormasPagamento/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erro ao excluir forma de pagamento');
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Erro ao excluir forma de pagamento:", error);
        document.getElementById('dados-forma-pagamento').innerHTML = `<p style="color: red;">Erro ao excluir forma de pagamento.</p>`;
    }
}

buscarDetalhes();