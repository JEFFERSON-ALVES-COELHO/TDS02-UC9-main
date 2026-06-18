const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {

        if (!id) {
            throw new Error('ID não informado na URL');
        }

        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`, {
            headers: getHeaders()
        });

        if (!response.ok)
            throw new Error('Erro ao carregar forma de pagamento');

        const formaPagamento = await response.json();

        document.getElementById('dados-formapagamento').innerHTML = `
            <p><strong>ID:</strong> ${formaPagamento.id}</p>
            <p><strong>Nome:</strong> ${formaPagamento.nome}</p>
            <p><strong>Ativo:</strong> ${formaPagamento.ativo ? 'Sim' : 'Não'}</p>
        `;

    } catch (error) {

        console.error("Erro ao carregar detalhes:", error);

        document.getElementById('dados-formapagamento').innerHTML = `
            <p style="color:red;">
                Erro ao carregar detalhes da forma de pagamento.
            </p>
        `;
    }
}

buscarDetalhes();