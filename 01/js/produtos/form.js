const form = document.getElementById("form-produto");

async function salvarProduto() {

    // caputrar o evento de 'click' em 'botaoSalvar'
    form.addEventListener('submit', async(e) => {
        e.preventDefault();

        // buscar os inputs e seus valores
        const nome = document.getElementById('nome').value
        const preco = parseFloat(document.getElementById('preco').value)
        const quantidadeEstoque = parseInt(document.getElementById('quantidadeEstoque').value)
        const fornecedorId = parseInt(document.getElementById('fornecedorId').value)

        // adicionar validadores
        if (!nome || !preco || !quantidadeEstoque || !fornecedorId) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        if(preco < 0) {
            alert('O preço não pode ser negativo!');
            return;
        }
        
        // tentar enviar esses valores para minha API
        const produtoDados = {
            nome: nome,
            preco: preco,
            quantidadeEstoque: quantidadeEstoque,
            fornecedorId: fornecedorId
        }

        const url = `${API_BASE_URL}/produtos`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(produtoDados)
            });

            if (!response.ok) throw new Error("Erro ao salvar produto")

            window.location.href = 'index.html';
        } catch (error) {
            console.error("Erro ao salvar: ", error);
            alert('Erro ao salvar o pdouto. Tente novamente!')
        }

        // cadastrando com sucesso, retornar para o index de produtos
    })
}

salvarProduto();