async function carregarProdutos() {
    try {
        const resposnse = await fetch(`${API_BASE_URL}/produtos`);
        const produtos = await resposnse.json();
        console.log(produtos);

        const tbody = document.getElementById("tabela-produtos");
        tbody.innerHTML = '';

        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.quantidadeEstoque}</td>
                <td>${produto.fornecedorId}</td>
                <td>
                    <a href="./detalhes.html?id=${produto.id}">Detalhes</a>
                    <a href="#">Editar</a>
                    <a href="#">Excluir</a>
                </td>
            `      
            tbody.appendChild(tr)   
        });        

    } catch (error) {
        console.error("Erro ao carregar os produtos", error);
    }
}

carregarProdutos();