const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`);
        if(!response) throw new Error("Erro ao carregar produto");

        const produto = await response.json();

        console.log(produto)

        document.getElementById("dados-produto").innerHTML = `
            <h3>${produto.nome}</h3>
            <h4><strong>Preço:</strong> R$ ${produto.preco}</h4>        
        `
       
    } catch (error) {
        console.error("Erro ao carregar detalhes", error)
        document.getElementById("dados-produto").innerHTML = `<p>Erro ao carregar dados do produto</p>`
    }
}


document.getElementById("btn-excluir").addEventListener('click', async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
            method: 'DELETE'
        })

        if(!response.ok) throw new Error("Erro ao excluir pdouto!");
         
        window.location.href = 'index.html'
    }catch(error) {
        console.log("Erro ao excluir: ", error);
        alert("Erro ao excluir o produto. Tente novamente.");
    }
})

buscarDetalhes();
