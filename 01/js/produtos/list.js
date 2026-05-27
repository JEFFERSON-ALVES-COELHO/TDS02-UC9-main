async function carregarProdutos() {
    try {
        const response = await fetch(`${API_BASE_URL}/Produtos`);
        const produtos = await response.json();
        console.log(produtos);
     
        const tbody = document.getElementById('tabela-produtos');
        tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.quantidadeEstoque}</td>
               <td>${produto.fornecedorId}</td>
               <td>
               
                <a href="detalhes.html">Detalhes</a>
                <a href="editar.html?id">Editar</a>
                <a href="excluir.html">Excluir</a>
               </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        //log capturado para a analise
        console.error('Erro ao carregar os produtos:', error);
    }
}

carregarProdutos();