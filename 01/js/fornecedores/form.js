const form = document.getElementById("form-fornecedor");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function salvarFornecedor() {
    if(id) {
        // vou tentar atualizar um forncedor existente
        document.getElementById('titulo-pagina').innerText = "Editar Fornecedor";

        try {
            const response = await fetch(`${API_BASE_URL}/fornecedores/${id}`);
            if (!response.ok) throw new Error("Erro ao carregar fornecedor!");

            const fornecedor = await response.json();

            console.log(fornecedor);

            document.getElementById('nome').value = fornecedor.nomeFantasia;
            document.getElementById('cpnj').value = fornecedor.cnpj;

        } catch(error) {
            console.log("Erro ao carregar fornecedor: ", error);
            alert('Erro ao carregar dados do fornecedor');
        }
    }

    // caputrar o evento de 'click' em 'botaoSalvar'
    form.addEventListener('submit', async(e) => {
        e.preventDefault();

        // buscar os inputs e seus valores
        const nome = document.getElementById('nome').value
        const cnpj = document.getElementById('cpnj').value

        // adicionar validadores
        if (!nome || !cnpj) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        // tentar enviar esses valores para minha API
        const fornecedorDados = {
            id: id ? parseInt(id) : 0,
            nomeFantasia: nome,
            cnpj: cnpj
        }

        const method = id ? 'PUT' : 'POST';

        const url = id ? `${API_BASE_URL}/fornecedores/${id}` : `${API_BASE_URL}/fornecedores`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(fornecedorDados)
            });

            if (!response.ok) throw new Error("Erro ao salvar fornecedor")

            window.location.href = 'index.html';
        } catch (error) {
            console.error("Erro ao salvar: ", error);
            alert('Erro ao salvar o fornecedor. Tente novamente!')
        }
    })
}

salvarFornecedor();