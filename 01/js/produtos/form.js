const form = document.getElementById("form-produto");
 
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
 
async function salvarProduto() {
        if(id) {
        // vou tentar atualizar um forncedor existente
        document.getElementById('titulo-pagina').innerText = "Editar Produto";
 
        try {
            const response = await fetch(`${API_BASE_URL}/produtos/${id}`);
            if (!response.ok) throw new Error("Erro ao carregar produto!");
            const produto = await response.json();
 
            console.log(produto);
 
            document.getElementById('nome').value = produto.nome;
            document.getElementById('preco').value = produto.preco;
            document.getElementById('quantidadeEstoque').value = produto.quantidadeEstoque;
            document.getElementById('fornecedorId').value = produto.fornecedorId;
 
        } catch(error) {
            console.log("Erro ao carregar produto: ", error);
            alert('Erro ao carregar dados do produto');
        }
    }
 
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
            id : id ? parseInt(id) : 0,
            nome: nome,
            preco: preco,
            quantidadeEstoque: quantidadeEstoque,
            fornecedorId: fornecedorId
        }
 
 
 
         const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_BASE_URL}/produtos/${id}` : `${API_BASE_URL}/produtos`;
 
        try {
            const response = await fetch(url, {
                method: method,
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