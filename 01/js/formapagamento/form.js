const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const form = document.getElementById('form-formapagamento');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erro ao carregar forma de pagamento');
        const formaPagamento = await response.json();

        
        document.getElementById('tipo').value = formaPagamento.nome;
        document.getElementById('id').value = formaPagamento.id;
        document.getElementById('ativo').checked = formaPagamento.ativo;


    } catch (error) {
        console.error("Erro ao carregar forma de pagamento:", error);
        alert('Erro ao carregar os dados da forma de pagamento');
    }
}

async function salvarForma(event) {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value.trim();
    if (!tipo) {
        alert('Informe o tipo de pagamento');
        return;
    }

    // mapear `tipo` para a propriedade `nome` esperada pelo backend
    const payload = {
        id: id ? parseInt(id) : 0,
        nome: tipo
    };

    try {
        let response;
        if (id) {
            response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(payload)
            });
        } else {
            response = await fetch(`${API_BASE_URL}/FormaPagamento`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            // volta para a lista
            window.location.href = 'index.html';
        } else {
            // tentar extrair mensagem detalhada do corpo (JSON ou texto)
            let detail = null;
            try {
                detail = await response.json();
            } catch (e) {
                try {   
                    detail = await response.text();
                } catch (e2) {
                    detail = null;
                }
            }

            console.error('Salvar forma de pagamento falhou', { status: response.status, body: detail });
            const userMessage = (detail && typeof detail === 'object' && detail.message) ? detail.message : (detail || `Status ${response.status}`);
            alert(userMessage || 'Erro ao salvar a forma de pagamento');
        }
    } catch (err) {
        console.error('Erro ao salvar forma de pagamento:', err);
        alert('Erro ao salvar a forma de pagamento');
    }
}

if (id) {
    buscarDetalhes();
}

if (form) {
    form.addEventListener('submit', salvarForma);
}