async function carregarFornecedores() {
    try {
        const resposta = await fetch(`${API_BASE_URL}/fornecedores`)
        const fornecedores = await resposta.json()

        const tbody = document.getElementById("tabela-fornecedores")
        tbody.innerHTML = '';

        fornecedores.forEach(fornecedor => {
            const novaLinhaDaTabela = document.createElement('tr')
            novaLinhaDaTabela.innerHTML = `
                <td>${fornecedor.id}</td>
                <td>${fornecedor.nomeFantasia}</td>
                <td>${fornecedor.cnpj}</td>
                <td>
                    <a href="./detalhes.html?id=${fornecedor.id}">Detalhes</a>
                    <a href="./form.html?id=${fornecedor.id}">Editar</a>
                    <a href="#">Excluir</a>
                </td>
            `;
            tbody.appendChild(novaLinhaDaTabela)
        });
        
    } catch (error) {
        console.error("Erro ao carregar fornecedores", error)
    }
}

carregarFornecedores()