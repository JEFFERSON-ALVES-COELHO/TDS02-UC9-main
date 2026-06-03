const form = document.getElementById("form-fornecedor");

async function salvarFornecedor() {
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        // buscar os inputs e seus valores
        const cnpj = document.getElementById('CNPJ').value
        const nomefantasia = document.getElementById('nome-fantasia').value

        // adicionar validadores
        if (!cnpj || !nomefantasia) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        const fornecedorDados = {
            
            cnpj: cnpj,
            nomefantasia: nomefantasia
        }

        const url = `${API_BASE_URL}/fornecedores`;

        try {
            const response = await fetch(url, {
                method: 'POST',
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
